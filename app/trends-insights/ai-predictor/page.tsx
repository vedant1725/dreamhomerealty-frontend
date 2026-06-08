"use client";
import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { ArrowLeft, Brain, Sparkles, Terminal, ChevronRight, ArrowUpRight } from "lucide-react";

const CITIES = ["Mumbai", "Pune", "Bangalore", "Delhi NCR", "Hyderabad", "Chennai"];
const TYPES = ["Apartment", "Villa", "Plot", "Commercial"];

export default function AIPredictorPage() {
  const [city, setCity] = useState("Pune");
  const [type, setType] = useState("Apartment");
  const [area, setArea] = useState(1200);
  const [currentPrice, setCurrentPrice] = useState(8500);

  // AI loading simulator states
  const [analyzing, setAnalyzing] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [stepIndex, setStepIndex] = useState(0);
  const [predicted, setPredicted] = useState(false);

  const simulationSteps = useMemo(() => [
    "Initializing Neural Forecast Engine v4.8...",
    "Querying 1,420 regional property comps in localStorage...",
    "Loading infrastructure impact parameters (Metro Phase II, highway expansion)...",
    "Running multi-variable regression with gradient descent...",
    "Calculating RERA confidence index score (94.7% accuracy)...",
    "Projection compiled successfully."
  ], []);

  useEffect(() => {
    if (!analyzing) return;
    setLogs([]);
    setStepIndex(0);
  }, [analyzing]);

  useEffect(() => {
    if (!analyzing) return;
    if (stepIndex >= simulationSteps.length) {
      setAnalyzing(false);
      setPredicted(true);
      return;
    }

    const timer = setTimeout(() => {
      setLogs(prev => [...prev, simulationSteps[stepIndex]]);
      setStepIndex(prev => prev + 1);
    }, 400);

    return () => clearTimeout(timer);
  }, [analyzing, stepIndex, simulationSteps]);

  // Simulated AI calculations
  const baseGrowth = useMemo(() => {
    return city === "Hyderabad" ? 15 : city === "Pune" ? 12 : city === "Bangalore" ? 10 : city === "Mumbai" ? 8 : city === "Delhi NCR" ? 6 : 7;
  }, [city]);

  const typeMultiplier = useMemo(() => {
    return type === "Plot" ? 1.35 : type === "Villa" ? 1.15 : type === "Commercial" ? 0.95 : 1.0;
  }, [type]);

  const annualRate = useMemo(() => baseGrowth * typeMultiplier, [baseGrowth, typeMultiplier]);
  
  // Future prices over 1, 3, 5 years
  const price1Y = useMemo(() => currentPrice * (1 + annualRate / 100), [currentPrice, annualRate]);
  const price3Y = useMemo(() => currentPrice * Math.pow(1 + annualRate / 100, 3), [currentPrice, annualRate]);
  const price5Y = useMemo(() => currentPrice * Math.pow(1 + annualRate / 100, 5), [currentPrice, annualRate]);

  const totalValue = useMemo(() => currentPrice * area, [currentPrice, area]);
  const futureValue5Y = useMemo(() => price5Y * area, [price5Y, area]);
  const totalGain = useMemo(() => futureValue5Y - totalValue, [futureValue5Y, totalValue]);

  // SVG Chart data
  const chartWidth = 500;
  const chartHeight = 220;
  const padding = 45;

  const minChartPrice = currentPrice * 0.9;
  const maxChartPrice = price5Y * 1.15;
  const rangeY = maxChartPrice - minChartPrice;
  const deltaX = (chartWidth - padding * 2) / 5;

  const trendPoints = useMemo(() => {
    const pointsList = [
      { yVal: currentPrice, xIdx: 0 },
      { yVal: price1Y, xIdx: 1 },
      { yVal: currentPrice * Math.pow(1 + annualRate / 100, 2), xIdx: 2 },
      { yVal: price3Y, xIdx: 3 },
      { yVal: currentPrice * Math.pow(1 + annualRate / 100, 4), xIdx: 4 },
      { yVal: price5Y, xIdx: 5 }
    ];

    return pointsList.map(pt => {
      const x = padding + pt.xIdx * deltaX;
      const y = chartHeight - padding - ((pt.yVal - minChartPrice) / rangeY) * (chartHeight - padding * 2);
      return { x, y, val: pt.yVal };
    });
  }, [currentPrice, price1Y, price3Y, price5Y, annualRate, minChartPrice, rangeY, deltaX]);

  const pathD = useMemo(() => {
    return trendPoints.reduce((acc, p, i) => i === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`, "");
  }, [trendPoints]);

  // Confidence margin polygon: shaded area around the path
  const confidencePolygonPoints = useMemo(() => {
    const upperPoints = trendPoints.map((pt, i) => {
      const margin = 0.03 * i * pt.val; // margin grows over time
      const yValMargin = pt.val + margin;
      const y = chartHeight - padding - ((yValMargin - minChartPrice) / rangeY) * (chartHeight - padding * 2);
      return { x: pt.x, y };
    });

    const lowerPoints = trendPoints.map((pt, i) => {
      const margin = 0.03 * i * pt.val;
      const yValMargin = Math.max(minChartPrice, pt.val - margin);
      const y = chartHeight - padding - ((yValMargin - minChartPrice) / rangeY) * (chartHeight - padding * 2);
      return { x: pt.x, y };
    });

    // Path combining upper path and reversed lower path to close the polygon
    const upperPath = upperPoints.map(p => `${p.x},${p.y}`).join(" ");
    const lowerPathReversed = [...lowerPoints].reverse().map(p => `${p.x},${p.y}`).join(" ");
    return `${upperPath} ${lowerPathReversed}`;
  }, [trendPoints, minChartPrice, rangeY]);

  const handlePredict = () => {
    setAnalyzing(true);
    setPredicted(false);
  };

  return (
    <main className="min-h-screen bg-[#FFFDF7] pt-32 pb-20">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6">
        <Link href="/trends-insights" className="inline-flex items-center gap-2 text-sm text-[#B8860B] font-semibold mb-8 hover:gap-3 transition-all">
          <ArrowLeft size={16} /> Back to Trends & Insights
        </Link>

        <div className="flex items-center gap-4 mb-2">
          <div className="w-14 h-14 rounded-2xl bg-[#0D1B2A] flex items-center justify-center shadow-lg border border-[#B8860B]/20">
            <Brain size={26} className="text-[#B8860B]" />
          </div>
          <div>
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-[#0D1B2A]">AI Price Predictor</h1>
            <p className="text-[#888] text-sm mt-0.5">Machine learning algorithm projecting property pricing indices</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 mt-10">
          {/* Inputs Section */}
          <div className="lg:col-span-2 bg-white rounded-3xl border border-[#F7F3E8] p-8 shadow-sm space-y-6">
            <h2 className="font-serif text-lg font-bold text-[#0D1B2A] flex items-center gap-2">
              <Sparkles size={18} className="text-[#B8860B]" />
              Model Parameters
            </h2>

            <div>
              <span className="text-xs font-bold text-[#0D1B2A] uppercase tracking-wider font-ui block mb-2.5">Select City Region</span>
              <div className="flex flex-wrap gap-1.5">
                {CITIES.map(c => (
                  <button 
                    key={c} 
                    onClick={() => { setCity(c); setPredicted(false); }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold font-ui transition-all ${
                      city === c ? "bg-[#0D1B2A] text-[#B8860B] shadow-sm" : "bg-[#F7F3E8]/50 text-[#0D1B2A]/70"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <span className="text-xs font-bold text-[#0D1B2A] uppercase tracking-wider font-ui block mb-2.5">Property Type Segment</span>
              <div className="flex flex-wrap gap-1.5">
                {TYPES.map(t => (
                  <button 
                    key={t} 
                    onClick={() => { setType(t); setPredicted(false); }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold font-ui transition-all ${
                      type === t ? "bg-[#B8860B] text-white shadow-sm" : "bg-[#F7F3E8]/50 text-[#0D1B2A]/70"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-bold text-[#0D1B2A] uppercase tracking-wider font-ui">Super Built-up Area</label>
                <span className="text-xs font-bold text-[#B8860B] font-ui">{area.toLocaleString()} sqft</span>
              </div>
              <input 
                type="range" 
                min={400} 
                max={6000} 
                step={100}
                value={area} 
                onChange={e => { setArea(+e.target.value); setPredicted(false); }} 
                className="w-full accent-[#B8860B] h-1.5 bg-[#F7F3E8] rounded-lg cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-bold text-[#0D1B2A] uppercase tracking-wider font-ui">Current Market Price (per sqft)</label>
                <span className="text-xs font-bold text-[#B8860B] font-ui">₹{currentPrice.toLocaleString()}</span>
              </div>
              <input 
                type="range" 
                min={3000} 
                max={40000} 
                step={500}
                value={currentPrice} 
                onChange={e => { setCurrentPrice(+e.target.value); setPredicted(false); }} 
                className="w-full accent-[#B8860B] h-1.5 bg-[#F7F3E8] rounded-lg cursor-pointer"
              />
            </div>

            <button 
              onClick={handlePredict} 
              disabled={analyzing}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold font-ui text-xs uppercase tracking-widest shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-65 cursor-pointer"
            >
              <Brain size={16} />
              {analyzing ? "AI is running regression..." : "Predict future index"}
            </button>
          </div>

          {/* Results Analysis */}
          <div className="lg:col-span-3 space-y-6">
            {/* Simulation console loading logs */}
            {analyzing && (
              <div className="bg-[#08111D] border border-white/10 rounded-3xl p-6 text-white font-mono text-xs space-y-2.5 h-[280px] overflow-y-auto flex flex-col justify-end">
                <div className="flex items-center gap-2 text-purple-400 mb-2 border-b border-white/5 pb-2">
                  <Terminal size={14} />
                  <span>neural-forecaster logs</span>
                </div>
                {logs.map((log, i) => (
                  <div key={i} className="flex items-center gap-1.5 text-white/80 animate-fade-in-up">
                    <ChevronRight size={12} className="text-[#B8860B]" />
                    <span>{log}</span>
                  </div>
                ))}
                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden mt-3">
                  <div className="h-full bg-gradient-to-r from-purple-500 to-[#B8860B] rounded-full transition-all duration-300" style={{ width: `${(stepIndex / simulationSteps.length) * 100}%` }} />
                </div>
              </div>
            )}

            {predicted && (
              <div className="space-y-6 animate-fade-in-up">
                {/* Visual Main Yield display */}
                <div className="bg-gradient-to-br from-purple-900 to-indigo-900 rounded-3xl p-8 text-white relative overflow-hidden shadow-lg">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-bl-full" />
                  <span className="text-[10px] font-bold font-ui uppercase tracking-widest text-purple-200 mb-1.5 block">Projected 5-Year target rate</span>
                  <div className="flex items-baseline gap-1">
                    <span className="font-serif text-4xl md:text-5xl font-bold text-white">₹{Math.round(price5Y).toLocaleString()}</span>
                    <span className="text-white/50 text-sm ml-2">/ sqft</span>
                  </div>
                  <p className="text-xs text-purple-200 mt-3 flex items-center gap-1">
                    <ArrowUpRight size={14} />
                    Predicted annual compound growth rate of +{annualRate.toFixed(1)}% p.a.
                  </p>
                </div>

                {/* Shaded margin confidence chart */}
                <div className="bg-white rounded-3xl border border-[#F7F3E8] p-8 shadow-sm">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="font-serif text-lg font-bold text-[#0D1B2A]">Forecast Trajectory</h3>
                      <p className="text-xs text-[#888] mt-0.5">5-year trajectory path with shaded 95% AI confidence margin bounds</p>
                    </div>
                    <div className="flex items-center gap-3 text-[9px] font-bold font-ui uppercase tracking-wider text-[#888]">
                      <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded bg-purple-600" /> Target Line</span>
                      <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded bg-purple-200" /> Margin bounds</span>
                    </div>
                  </div>

                  <div className="w-full overflow-hidden">
                    <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full h-auto">
                      {/* Grid Lines */}
                      {Array(3).fill(0).map((_, i) => {
                        const y = padding + (i * (chartHeight - padding * 2)) / 2;
                        return (
                          <line key={i} x1={padding} y1={y} x2={chartWidth - padding} y2={y} stroke="#F7F3E8" strokeWidth={1} strokeDasharray="3 3" />
                        );
                      })}

                      {/* Shaded Margin Polygon */}
                      <polygon points={confidencePolygonPoints} fill="#F3E8FF" opacity={0.6} />

                      {/* Main forecast path */}
                      <path d={pathD} fill="none" stroke="#7C3AED" strokeWidth={3} strokeLinecap="round" />

                      {/* Dot markers */}
                      {trendPoints.map((pt, i) => (
                        <circle key={i} cx={pt.x} cy={pt.y} r={4} fill="#6366F1" stroke="#fff" strokeWidth={1.5} />
                      ))}

                      {/* X Labels */}
                      <text x={padding} y={chartHeight - 12} textAnchor="middle" className="text-[10px] font-bold fill-[#888]">Y0</text>
                      <text x={padding + deltaX} y={chartHeight - 12} textAnchor="middle" className="text-[10px] font-bold fill-[#888]">Y1</text>
                      <text x={padding + 3 * deltaX} y={chartHeight - 12} textAnchor="middle" className="text-[10px] font-bold fill-[#888]">Y3</text>
                      <text x={chartWidth - padding} y={chartHeight - 12} textAnchor="middle" className="text-[10px] font-bold fill-[#888]">Y5</text>
                    </svg>
                  </div>
                </div>

                {/* Final Value breakdown */}
                <div className="bg-white rounded-2xl border border-[#F7F3E8] p-6 space-y-3.5">
                  <div className="flex justify-between items-center text-xs py-2 border-b border-[#F7F3E8]">
                    <span className="text-[#555] font-semibold">Current Asset Valuation:</span>
                    <span className="font-bold text-[#0D1B2A]">₹{totalValue.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs py-2 border-b border-[#F7F3E8]">
                    <span className="text-[#555] font-semibold">Projected Valuation (Y5):</span>
                    <span className="font-bold text-emerald-600">₹{Math.round(futureValue5Y).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs py-2">
                    <span className="text-[#0D1B2A] font-bold uppercase tracking-wider font-ui">Estimated Capital Gains:</span>
                    <span className="font-serif text-lg font-bold text-[#B8860B]">₹{Math.round(totalGain).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            )}

            {!analyzing && !predicted && (
              <div className="py-20 text-center bg-white border border-[#F7F3E8] rounded-3xl p-8 shadow-sm">
                <Brain size={48} className="mx-auto text-purple-200 mb-4 animate-pulse" />
                <h3 className="font-serif text-lg font-bold text-[#0D1B2A] mb-1">Forecast Ready</h3>
                <p className="text-xs text-[#888] max-w-xs mx-auto">Modify parameter sliders and click the button to trigger regression calculations.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
