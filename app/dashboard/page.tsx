"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Menu, X, Search, Heart, User, ChevronDown, MapPin, Plus, Bell,
  Home, Building2, TrendingUp, ChevronRight, BadgeCheck, Landmark,
  Brain, Calculator, Lock, Award, Users, Star,
  Sparkles, MessageSquare, Send, CheckCircle2, AlertCircle,
  FileText, Cpu, BarChart3, HelpCircle,
  Calendar, DollarSign, ArrowUpRight, ArrowDownRight, Eye, RefreshCw,
  Settings, LogOut, Trash2, Edit2, CheckSquare, PlusCircle
} from "lucide-react";
import { useAuth, API_BASE } from "@/context/AuthContext";
import { PROPERTIES } from "@/lib/data";

interface BackendProperty {
  _id: string;
  id: number;
  title: string;
  price: number;
  priceDisplay: string;
  location: string;
  city: string;
  locality: string;
  state: string;
  beds: number;
  baths: number;
  area: number;
  type: string;
  status: string;
  furnishing?: string;
  image: string;
  rera?: string;
  agentName: string;
  agentPhone: string;
  description?: string;
}

interface ClientLead {
  _id: string;
  id: number;
  name: string;
  phone: string;
  email?: string;
  interestedIn: string;
  budget: number;
  status: "Under Negotiation" | "New Lead" | "Site Visit Done" | "Closed";
  lastContact: string;
}

interface AgentTask {
  _id: string;
  id: number;
  title: string;
  dueDate: string;
  status: "Pending" | "In Progress" | "Completed";
  assignedTo: string;
}

interface DeveloperProject {
  _id: string;
  id: number;
  name: string;
  builder: string;
  location: string;
  city: string;
  startingPrice: number;
  priceDisplay: string;
  status: "Under Construction" | "Ready to Move" | "New Launch";
  completion: number;
  units: number;
  unitsSold: number;
  revenue: number;
  image: string;
  types: string;
}

interface Bid {
  bidder: string;
  bidderEmail: string;
  bidAmount: number;
  time: string;
}

interface Auction {
  _id: string;
  id: number;
  title: string;
  description: string;
  image: string;
  location: string;
  city: string;
  locality: string;
  area: number;
  startingPrice: number;
  currentBid: number;
  endsAt: string;
  status: "active" | "ended";
  bids: Bid[];
}

interface Inquiry {
  _id: string;
  propertyId: number;
  propertyName: string;
  agentName: string;
  agentPhone: string;
  name: string;
  phone: string;
  message?: string;
  type: "contact" | "visit";
  visitDate?: string;
  status: "new" | "contacted" | "closed";
  createdAt: string;
}

export default function DashboardPage() {
  const { user, token, logout } = useAuth();
  
  // Tab controller
  const [activeTab, setActiveTab] = useState("dashboard");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dashboardSearch, setDashboardSearch] = useState("");

  // Live Database States
  const [liveProperties, setLiveProperties] = useState<BackendProperty[]>([]);
  const [clients, setClients] = useState<ClientLead[]>([]);
  const [tasks, setTasks] = useState<AgentTask[]>([]);
  const [projects, setProjects] = useState<DeveloperProject[]>([]);
  const [auctions, setAuctions] = useState<Auction[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  
  // Wishlist
  const [wishlistItems, setWishlistItems] = useState<BackendProperty[]>([]);

  // Selected entities for detail panels
  const [selectedAuction, setSelectedAuction] = useState<Auction | null>(null);
  const [customBidAmount, setCustomBidAmount] = useState<string>("");

  // UI state management
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  // Quick Action Modals toggles
  const [isPropertyModalOpen, setIsPropertyModalOpen] = useState(false);
  const [isClientModalOpen, setIsClientModalOpen] = useState(false);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isVisitModalOpen, setIsVisitModalOpen] = useState(false);

  // Form Inputs: Property
  const [propTitle, setPropTitle] = useState("");
  const [propPrice, setPropPrice] = useState("");
  const [propLocation, setPropLocation] = useState("");
  const [propCity, setPropCity] = useState("Ahmedabad");
  const [propLocality, setPropLocality] = useState("");
  const [propBeds, setPropBeds] = useState("3");
  const [propBaths, setPropBaths] = useState("3");
  const [propArea, setPropArea] = useState("");
  const [propType, setPropType] = useState("Apartment");
  const [propStatus, setPropStatus] = useState("Ready to Move");
  const [propImage, setPropImage] = useState("https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=600");
  const [propRera, setPropRera] = useState("");
  const [propDescription, setPropDescription] = useState("");

  // Form Inputs: Client
  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientIntProp, setClientIntProp] = useState("3 BHK Apartment");
  const [clientBudget, setClientBudget] = useState("");
  const [clientStatus, setClientStatus] = useState<any>("New Lead");

  // Form Inputs: Project
  const [projName, setProjName] = useState("");
  const [projBuilder, setProjBuilder] = useState("");
  const [projLocation, setProjLocation] = useState("");
  const [projCity, setProjCity] = useState("Ahmedabad");
  const [projPrice, setProjPrice] = useState("");
  const [projStatus, setProjStatus] = useState<any>("Under Construction");
  const [projCompletion, setProjCompletion] = useState("50");
  const [projTypes, setProjTypes] = useState("3 & 4 BHK Apartments");
  const [projUnits, setProjUnits] = useState("");
  const [projImage, setProjImage] = useState("https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=900");

  // Form Inputs: Task
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDueDate, setTaskDueDate] = useState("");

  // Form Inputs: Site Visit
  const [visitName, setVisitName] = useState("");
  const [visitPhone, setVisitPhone] = useState("");
  const [visitPropId, setVisitPropId] = useState("");
  const [visitDate, setVisitDate] = useState("");
  const [visitMessage, setVisitMessage] = useState("");

  // Price Predictor & Finance Slider States
  const [emiLoan, setEmiLoan] = useState(60000000);
  const [emiRate, setEmiRate] = useState(8.5);
  const [emiTenure, setEmiTenure] = useState(20);
  const [emiMonthly, setEmiMonthly] = useState(52069);
  const [oracleLocality, setOracleLocality] = useState("Bopal, Ahmedabad");
  const [oracleResult, setOracleResult] = useState({
    min: "₹68.5 L", max: "₹74.2 L", confidence: "91%", status: "High Confidence",
    recommendation: "Strong Buy - Historical growth shows 14.5% annual appreciation."
  });
  const [chatInput, setChatInput] = useState("");
  const [chatLog, setChatLog] = useState([
    { sender: "bot", text: "Welcome to DreamHome Intelligence Center. How can I help you today?" }
  ]);

  // Recalculate EMI
  useEffect(() => {
    const r = emiRate / 12 / 100;
    const n = emiTenure * 12;
    const emi = (emiLoan * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    setEmiMonthly(Math.round(emi));
  }, [emiLoan, emiRate, emiTenure]);

  // Init Data fetch
  useEffect(() => {
    fetchDashboardData();
  }, [user, token]);

  const showMsg = (text: string, type: "success" | "error" = "success") => {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 4000);
  };

  const formatPrice = (val: number) => {
    if (val >= 10000000) {
      return `₹${(val / 10000000).toFixed(2)} Cr`;
    }
    return `₹${(val / 100000).toFixed(0)} L`;
  };

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      // 1. Fetch properties
      const resProp = await fetch(`${API_BASE}/properties?limit=100`);
      const dataProp = await resProp.json();
      if (dataProp.success && dataProp.properties) {
        setLiveProperties(dataProp.properties);
      }

      // 2. Fetch developer projects
      const resProj = await fetch(`${API_BASE}/projects`);
      const dataProj = await resProj.json();
      if (dataProj.success && dataProj.projects) {
        setProjects(dataProj.projects);
      }

      // 3. Fetch auctions
      const resAuctions = await fetch(`${API_BASE}/auctions`);
      const dataAuctions = await resAuctions.json();
      if (dataAuctions.success && dataAuctions.auctions) {
        setAuctions(dataAuctions.auctions);
        if (dataAuctions.auctions.length > 0) {
          setSelectedAuction(dataAuctions.auctions[0]);
        }
      }

      // Authenticated requests
      if (user && token) {
        // Fetch current user wishlist
        const resMe = await fetch(`${API_BASE}/auth/me`, {
          headers: { "Authorization": `Bearer ${token}` }
        });
        const dataMe = await resMe.json();
        if (dataMe.success && dataMe.user) {
          setWishlistItems(dataMe.user.wishlist || []);
        }

        // Fetch clients list
        const resClients = await fetch(`${API_BASE}/clients`, {
          headers: { "Authorization": `Bearer ${token}` }
        });
        const dataClients = await resClients.json();
        if (dataClients.success && dataClients.clients) {
          setClients(dataClients.clients);
        }

        // Fetch agent tasks
        const resTasks = await fetch(`${API_BASE}/tasks`, {
          headers: { "Authorization": `Bearer ${token}` }
        });
        const dataTasks = await resTasks.json();
        if (dataTasks.success && dataTasks.tasks) {
          setTasks(dataTasks.tasks);
        }

        // Fetch inquiries leads
        const resInq = await fetch(`${API_BASE}/inquiries`, {
          headers: { "Authorization": `Bearer ${token}` }
        });
        const dataInq = await resInq.json();
        if (dataInq.success && dataInq.inquiries) {
          setInquiries(dataInq.inquiries);
        }
      }
    } catch (error) {
      console.warn("Offline mock values activated.");
    } finally {
      setLoading(false);
    }
  };

  // Actions posting logic
  const handleAddProperty = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    setActionLoading(true);

    const priceNum = Number(propPrice);
    const newProperty = {
      title: propTitle,
      price: priceNum,
      priceDisplay: formatPrice(priceNum),
      location: propLocation,
      city: propCity,
      locality: propLocality,
      state: "Gujarat",
      beds: Number(propBeds),
      baths: Number(propBaths),
      area: Number(propArea),
      type: propType,
      status: propStatus,
      image: propImage,
      rera: propRera,
      description: propDescription,
      agentName: `${user?.firstName} ${user?.lastName}`,
      agentPhone: user?.phone || "+91 98765 43210",
      agentAvatar: "https://i.pravatar.cc/150?img=11"
    };

    try {
      const res = await fetch(`${API_BASE}/properties`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(newProperty)
      });
      const data = await res.json();
      if (data.success) {
        showMsg("Listing created!");
        setIsPropertyModalOpen(false);
        // Reset
        setPropTitle(""); setPropPrice(""); setPropLocation(""); setPropLocality(""); setPropArea("");
        fetchDashboardData();
      } else {
        showMsg(data.message || "Error posting property.", "error");
      }
    } catch (err) {
      showMsg("Network error.", "error");
    } finally {
      setActionLoading(false);
    }
  };

  const handleAddClient = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    setActionLoading(true);

    const newClient = {
      name: clientName,
      phone: clientPhone,
      email: clientEmail,
      interestedIn: clientIntProp,
      budget: Number(clientBudget),
      status: clientStatus
    };

    try {
      const res = await fetch(`${API_BASE}/clients`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(newClient)
      });
      const data = await res.json();
      if (data.success) {
        showMsg("Client lead added!");
        setIsClientModalOpen(false);
        setClientName(""); setClientPhone(""); setClientEmail(""); setClientBudget("");
        fetchDashboardData();
      }
    } catch (err) {
      showMsg("Network error.", "error");
    } finally {
      setActionLoading(false);
    }
  };

  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    setActionLoading(true);

    const priceNum = Number(projPrice);
    const newProject = {
      name: projName,
      builder: projBuilder,
      location: projLocation,
      city: projCity,
      startingPrice: priceNum,
      priceDisplay: formatPrice(priceNum) + "+",
      status: projStatus,
      completion: Number(projCompletion),
      types: projTypes,
      units: Number(projUnits || 50),
      unitsSold: 0,
      revenue: 0,
      image: projImage
    };

    try {
      const res = await fetch(`${API_BASE}/projects`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(newProject)
      });
      const data = await res.json();
      if (data.success) {
        showMsg("Developer Project launched!");
        setIsProjectModalOpen(false);
        setProjName(""); setProjBuilder(""); setProjLocation(""); setProjPrice("");
        fetchDashboardData();
      }
    } catch (err) {
      showMsg("Network error.", "error");
    } finally {
      setActionLoading(false);
    }
  };

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    setActionLoading(true);

    const newTask = {
      title: taskTitle,
      dueDate: new Date(taskDueDate),
      status: "Pending",
      assignedTo: "Agent"
    };

    try {
      const res = await fetch(`${API_BASE}/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(newTask)
      });
      const data = await res.json();
      if (data.success) {
        showMsg("Task scheduled!");
        setIsTaskModalOpen(false);
        setTaskTitle(""); setTaskDueDate("");
        fetchDashboardData();
      }
    } catch (err) {
      showMsg("Network error.", "error");
    } finally {
      setActionLoading(false);
    }
  };

  const handleAddVisit = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionLoading(true);

    const newInquiry = {
      propertyId: Number(visitPropId) || 1,
      name: visitName,
      phone: visitPhone,
      message: visitMessage,
      type: "visit",
      visitDate: new Date(visitDate)
    };

    try {
      const res = await fetch(`${API_BASE}/inquiries`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newInquiry)
      });
      const data = await res.json();
      if (data.success) {
        showMsg("Site visit scheduled successfully!");
        setIsVisitModalOpen(false);
        setVisitName(""); setVisitPhone(""); setVisitMessage(""); setVisitDate("");
        fetchDashboardData();
      }
    } catch (err) {
      showMsg("Network error.", "error");
    } finally {
      setActionLoading(false);
    }
  };

  const handleGenerateReport = () => {
    if (liveProperties.length === 0) {
      showMsg("No listings to generate report.", "error");
      return;
    }
    const headers = "ID,Title,Price,City,Locality,Beds,Baths,Area,Type\n";
    const rows = liveProperties.map(p => 
      `${p.id},"${p.title.replace(/"/g, '""')}",${p.price},"${p.city}","${p.locality}",${p.beds},${p.baths},${p.area},"${p.type}"`
    ).join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `DreamHome_Property_Report_${new Date().toISOString().slice(0,10)}.csv`;
    link.click();
    showMsg("Spreadsheet report generated successfully!");
  };

  // Toggle Wishlist
  const handleToggleWishlist = async (id: number) => {
    if (!token) {
      showMsg("Please sign in.", "error");
      return;
    }
    try {
      const res = await fetch(`${API_BASE}/auth/wishlist/toggle`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ propertyId: id })
      });
      const data = await res.json();
      if (data.success) {
        setWishlistItems(data.wishlist);
        showMsg("Wishlist toggled!");
      }
    } catch (err) {
      showMsg("Network error.", "error");
    }
  };

  const handlePlaceBid = async (amount: number) => {
    if (!token) {
      showMsg("Please log in to place bids.", "error");
      return;
    }
    if (!selectedAuction) return;
    try {
      const res = await fetch(`${API_BASE}/auctions/${selectedAuction.id}/bid`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ bidAmount: amount })
      });
      const data = await res.json();
      if (data.success) {
        setSelectedAuction(data.auction);
        setAuctions(prev => prev.map(a => a.id === data.auction.id ? data.auction : a));
        setCustomBidAmount("");
        showMsg("Bid accepted!");
      } else {
        showMsg(data.message || "Failed.", "error");
      }
    } catch (err) {
      showMsg("Network error.", "error");
    }
  };

  const handleChatSend = () => {
    if (!chatInput.trim()) return;
    const msg = chatInput;
    setChatLog(prev => [...prev, { sender: "user", text: msg }]);
    setChatInput("");
    setTimeout(() => {
      let r = "I will scan our property database for that.";
      if (msg.toLowerCase().includes("bhk")) r = "Ahmedabad has 8 high-performance projects starting at ₹1.8 Cr onwards in Bopal and Shela.";
      else if (msg.toLowerCase().includes("rera")) r = "All our builder launches are 100% RERA compliant. Verification IDs are linked in reports.";
      setChatLog(prev => [...prev, { sender: "bot", text: r }]);
    }, 1000);
  };

  // 13 Navigation items matching sidebar
  const SIDEBAR_ITEMS = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "properties", label: "Properties", icon: Building2 },
    { id: "clients", label: "Clients & Leads", icon: Users },
    { id: "projects", label: "Projects", icon: TrendingUp },
    { id: "investments", label: "Investments", icon: Award },
    { id: "financials", label: "Financials", icon: Calculator },
    { id: "aimatch", label: "AI Match Center", icon: Brain, badge: "NEW" },
    { id: "smartmap", label: "Smart Map", icon: MapPin },
    { id: "marketinsights", label: "Market Insights", icon: Cpu },
    { id: "taskmanager", label: "Task Manager", icon: CheckSquare, count: tasks.filter(t=>t.status!=="Completed").length },
    { id: "documents", label: "Documents", icon: FileText },
    { id: "reports", label: "Reports", icon: BarChart3 },
    { id: "settings", label: "Settings", icon: Settings }
  ];

  return (
    <main className="h-screen w-screen bg-[#F8FAFC] flex flex-row overflow-hidden font-sans">
      
      {/* ═══════════════════════════════════════════════════════════════
          SIDEBAR
          ═══════════════════════════════════════════════════════════════ */}
      <aside className="hidden lg:flex w-[260px] h-full bg-[#0D1B2A] text-white flex-col justify-between shrink-0 border-r border-[#1C3A5E] z-40">
        <div className="flex flex-col flex-1 overflow-y-auto scrollbar-hide">
          <div className="p-6 border-b border-[#1C3A5E] flex items-center gap-3">
            <Link href="/" className="flex items-center group py-1.5">
              <img 
                src="/dream home logo.png" 
                alt="Logo" 
                className="h-11 w-auto object-contain transition-all duration-300 group-hover:scale-105"
              />
            </Link>
          </div>

          <nav className="p-4 space-y-1 flex-1">
            {SIDEBAR_ITEMS.map((item) => {
              const isActive = activeTab === item.id;
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between gap-3 px-4 py-2.5 rounded-xl text-xs font-bold font-ui transition-all text-left group cursor-pointer ${
                    isActive 
                      ? "bg-[#B38F43] text-white shadow-[0_4px_12px_rgba(179,143,67,0.3)]" 
                      : "text-white/75 hover:bg-[#1C3A5E] hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon size={15} className={isActive ? "text-white" : "text-[#B38F43] group-hover:scale-110 transition-transform"} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="text-[8px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-500 text-white animate-pulse">
                      {item.badge}
                    </span>
                  )}
                  {item.count !== undefined && item.count > 0 && (
                    <span className="text-[9px] font-black px-1.5 py-0.5 rounded-md bg-[#B38F43]/30 text-[#F5E6C0] border border-[#B38F43]/45">
                      {item.count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* AI Assistant beta card in sidebar */}
        <div className="p-4 m-4 bg-[#1C3A5E]/30 border border-[#1C3A5E]/60 rounded-2xl relative overflow-hidden space-y-3">
          <div className="absolute -bottom-8 -right-8 w-24 h-24 rounded-full bg-[#B38F43]/10 blur-xl"></div>
          <div className="flex items-center gap-1.5">
            <span className="text-[8px] font-black uppercase tracking-wider bg-[#B38F43] text-white px-1.5 py-0.5 rounded">
              BETA
            </span>
            <span className="text-xs font-bold text-white/90">AI Assistant</span>
          </div>
          <p className="text-[9px] text-white/60 leading-relaxed">
            Ask anything about market trends, property values, or client insights.
          </p>
          <button 
            onClick={() => setActiveTab("marketinsights")}
            className="w-full py-2 bg-[#B38F43] hover:bg-[#967431] text-white text-[10px] font-black uppercase tracking-wider rounded-xl transition-all shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
          >
            Ask AI Assistant <ChevronRight size={12} />
          </button>
        </div>

        {/* Profile indicator & logout */}
        <div className="p-4 border-t border-[#1C3A5E] flex justify-between items-center gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-8 h-8 rounded-xl bg-[#B38F43]/20 flex items-center justify-center text-[#B38F43] font-bold text-xs shrink-0">
              {user ? user.firstName[0].toUpperCase() : "R"}
            </div>
            <div className="min-w-0">
              <p className="text-[11px] font-bold truncate">{user ? `${user.firstName} ${user.lastName}` : "Rohan Mehta"}</p>
              <p className="text-[8px] text-white/50 truncate">Premium Member</p>
            </div>
          </div>
          <button 
            onClick={() => { if (confirm("Log out?")) logout(); }}
            className="p-2 text-red-400 hover:text-white rounded-lg hover:bg-red-500/10 cursor-pointer"
            title="Log Out"
          >
            <LogOut size={14} />
          </button>
        </div>
      </aside>

      {/* ═══════════════════════════════════════════════════════════════
          MAIN WORKSPACE
          ═══════════════════════════════════════════════════════════════ */}
      <div className="flex-1 flex flex-col h-full overflow-y-auto">
        
        {/* HEADER */}
        <header className="bg-white border-b border-[#E2E8F0] px-8 py-4 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button onClick={() => setMobileMenuOpen(true)} className="lg:hidden p-2 hover:bg-[#F1F5F9] rounded-xl text-[#0D1B2A]">
              <Menu size={20} />
            </button>
            <div>
              <h1 className="font-serif text-lg font-black text-[#0D1B2A] leading-tight">
                Good Morning, <span className="text-[#B38F43]">{user ? user.firstName : "Rohan"}! 👋</span>
              </h1>
              <p className="text-[10px] text-[#64748B] mt-0.5">Here's what's happening with your real estate business today.</p>
            </div>
          </div>

          <div className="hidden md:flex relative w-80">
            <input 
              type="text" 
              placeholder="Search properties, clients, projects..."
              value={dashboardSearch}
              onChange={(e) => setDashboardSearch(e.target.value)}
              className="w-full bg-[#F8FAFC] border border-[#E2E8F0] pl-4 pr-10 py-2 rounded-xl text-xs focus:outline-none focus:border-[#B38F43] text-[#0D1B2A]"
            />
            <Search size={14} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#64748B]" />
          </div>

          {/* Top profile elements matching image */}
          <div className="flex items-center gap-4">
            <button onClick={() => setActiveTab("settings")} className="p-2 hover:bg-[#F1F5F9] rounded-xl text-[#64748B] relative">
              <Bell size={18} />
              <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-red-500 rounded-full text-white text-[8px] flex items-center justify-center font-bold">3</span>
            </button>
            <button onClick={() => setActiveTab("settings")} className="p-2 hover:bg-[#F1F5F9] rounded-xl text-[#64748B]">
              <MessageSquare size={18} />
            </button>
            <button onClick={() => setActiveTab("taskmanager")} className="p-2 hover:bg-[#F1F5F9] rounded-xl text-[#64748B]">
              <Calendar size={18} />
            </button>

            <div className="flex items-center gap-3 border-l border-[#E2E8F0] pl-4">
              <div className="text-right">
                <p className="text-xs font-bold text-[#0D1B2A]">{user ? `${user.firstName} ${user.lastName}` : "Rohan Mehta"}</p>
                <p className="text-[8px] text-[#B38F43] font-semibold">Premium Member</p>
              </div>
              <div className="w-9 h-9 rounded-xl overflow-hidden border border-[#FAF9F6] shadow-sm">
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150" alt="Avatar" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </header>

        {/* Notification Banner */}
        {message && (
          <div className={`mx-8 mt-6 p-4 rounded-xl border flex items-center gap-2.5 animate-fade-in ${
            message.type === "success" ? "bg-emerald-50 border-emerald-200 text-emerald-800" : "bg-red-50 border-red-200 text-red-800"
          }`}>
            {message.type === "success" ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
            <span className="text-xs font-semibold">{message.text}</span>
          </div>
        )}

        <div className="p-8 max-w-[1600px] mx-auto w-full space-y-8 flex-1">
          
          {/* TAB 1: OVERVIEW DASHBOARD */}
          {activeTab === "dashboard" && (
            <div className="space-y-8 animate-fade-in">
              
              {/* Date Header Row */}
              <div className="flex justify-between items-center bg-white border border-[#E2E8F0] px-6 py-3.5 rounded-2xl shadow-sm">
                <h3 className="text-xs font-bold text-[#0d1b2a]">Overview</h3>
                <div className="flex items-center gap-3 text-xs">
                  <span className="text-[#64748B] font-semibold">May 1 - May 31, 2025</span>
                  <button className="px-3.5 py-1.5 bg-[#B38F43] hover:bg-[#967431] text-white text-[10px] font-black uppercase rounded-lg shadow cursor-pointer">
                    Customize
                  </button>
                </div>
              </div>

              {/* Stats 5-column grid matching image */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                {[
                  { label: "Total Properties", val: "342", trend: "12.5%", color: "text-emerald-600 bg-emerald-50" },
                  { label: "Active Clients", val: "1,246", trend: "8.7%", color: "text-emerald-600 bg-emerald-50" },
                  { label: "Total Revenue", val: "₹18.6Cr", trend: "21.4%", color: "text-emerald-600 bg-emerald-50" },
                  { label: "Active Projects", val: "28", trend: "5", color: "text-emerald-600 bg-emerald-50" },
                  { label: "Conversion Rate", val: "24.6%", trend: "3.1%", color: "text-emerald-600 bg-emerald-50" }
                ].map((st, idx) => (
                  <div key={idx} className="bg-white rounded-2xl p-4.5 border border-[#E2E8F0] shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
                    <p className="text-[10px] text-[#64748B] font-bold uppercase tracking-wider">{st.label}</p>
                    <p className="font-serif text-2xl font-black text-[#0D1B2A] mt-2">{st.val}</p>
                    <p className="text-[9px] text-emerald-600 font-bold mt-1.5 flex items-center gap-0.5">
                      <ArrowUpRight size={10} /> {st.trend} vs last month
                    </p>
                  </div>
                ))}
              </div>

              {/* Main row grid: Revenue, Property Status Donut, AI Market Insight */}
              <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
                
                {/* Revenue Line Chart Card (8 cols) */}
                <div className="xl:col-span-8 bg-white border border-[#E2E8F0] p-6 rounded-2xl shadow-sm">
                  <div className="flex justify-between items-center mb-5">
                    <div>
                      <h4 className="font-serif text-base font-black text-[#0D1B2A]">Revenue Overview</h4>
                    </div>
                    <div className="flex gap-4 text-[10px] font-bold text-[#64748B]">
                      <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-[#B38F43] inline-block"></span> Revenue (₹ Cr)</span>
                      <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-[#94A3B8] border-dashed border-t inline-block"></span> Expenses (₹ Cr)</span>
                    </div>
                  </div>

                  <div className="h-56 relative flex items-end">
                    <svg className="w-full h-full text-[#B38F43]" viewBox="0 0 100 30" fill="none" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="chartG" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#B38F43" stopOpacity="0.15"/>
                          <stop offset="100%" stopColor="#B38F43" stopOpacity="0"/>
                        </linearGradient>
                      </defs>
                      <path d="M 0 20 Q 25 18 50 20 T 75 14 T 100 8 L 100 30 L 0 30 Z" fill="url(#chartG)" />
                      {/* Revenue Gold line */}
                      <path d="M 0 20 Q 25 18 50 20 T 75 14 T 100 8" stroke="#B38F43" strokeWidth="2" strokeLinecap="round" />
                      {/* Expenses dashed line */}
                      <path d="M 0 25 Q 25 24 50 21 T 75 22 T 100 18" stroke="#94A3B8" strokeWidth="1" strokeDasharray="2 2" />
                      {/* Tooltip dot matching May 20, 2025 */}
                      <circle cx="72" cy="15.5" r="2.5" fill="#B38F43" stroke="#FFF" strokeWidth="0.8" />
                    </svg>

                    {/* Interactive hover tooltip simulation */}
                    <div className="absolute top-12 left-1/2 bg-white/95 backdrop-blur-sm border border-[#E2E8F0] p-2.5 rounded-xl shadow-lg text-[9px] text-[#0d1b2a] font-bold">
                      <p className="text-[#64748B] text-[8px]">May 20, 2025</p>
                      <p className="flex justify-between gap-4 mt-0.5">Revenue: <span className="text-[#B38F43]">₹14.8 Cr</span></p>
                      <p className="flex justify-between gap-4">Expenses: <span className="text-slate-500">₹6.3 Cr</span></p>
                    </div>
                  </div>

                  <div className="flex justify-between text-[9px] text-[#94A3B8] font-bold border-t border-[#F1F5F9] pt-3.5 mt-2">
                    <span>May 1</span>
                    <span>May 8</span>
                    <span>May 15</span>
                    <span>May 22</span>
                    <span>May 31</span>
                  </div>
                </div>

                {/* Property Status Donut Chart Card (4 cols) */}
                <div className="xl:col-span-4 bg-white border border-[#E2E8F0] p-6 rounded-2xl shadow-sm flex flex-col justify-between">
                  <h4 className="font-serif text-base font-black text-[#0D1B2A] mb-4">Property Status</h4>
                  
                  <div className="relative h-44 flex items-center justify-center">
                    <svg className="w-40 h-40" viewBox="0 0 42 42">
                      <circle cx="21" cy="21" r="15.9155" fill="transparent" stroke="#F1F5F9" strokeWidth="5"></circle>
                      {/* Available (35.1%) - Green */}
                      <circle cx="21" cy="21" r="15.9155" fill="transparent" stroke="#10B981" strokeWidth="5" strokeDasharray="35.1 64.9" strokeDashoffset="25"></circle>
                      {/* Under Negotiation (21.9%) - Blue */}
                      <circle cx="21" cy="21" r="15.9155" fill="transparent" stroke="#3B82F6" strokeWidth="5" strokeDasharray="21.9 78.1" strokeDashoffset="-10.1"></circle>
                      {/* Sold (28.7%) - Gold */}
                      <circle cx="21" cy="21" r="15.9155" fill="transparent" stroke="#B38F43" strokeWidth="5" strokeDasharray="28.7 71.3" strokeDashoffset="-32"></circle>
                      {/* Off Market (14.3%) - Gray */}
                      <circle cx="21" cy="21" r="15.9155" fill="transparent" stroke="#94A3B8" strokeWidth="5" strokeDasharray="14.3 85.7" strokeDashoffset="-60.7"></circle>
                      <text x="21" y="20.5" textAnchor="middle" className="text-[5px] font-black fill-[#0D1B2A]">342</text>
                      <text x="21" y="24.5" textAnchor="middle" className="text-[2.5px] fill-[#64748B] font-bold uppercase tracking-wider">Total</text>
                    </svg>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mt-4 text-[9px] font-bold text-[#555] border-t border-[#F1F5F9] pt-3">
                    <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#10B981] inline-block"></span> Available: 120 (35.1%)</span>
                    <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#3B82F6] inline-block"></span> Negotiation: 75 (21.9%)</span>
                    <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#B38F43] inline-block"></span> Sold: 98 (28.7%)</span>
                    <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#94A3B8] inline-block"></span> Off Market: 49 (14.3%)</span>
                  </div>
                </div>

              </div>

              {/* Row grid: Performing Projects, Leads Chart, AI Insight Widget */}
              <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
                
                {/* Left Column (8 cols): Performings & Recent Clients */}
                <div className="xl:col-span-8 space-y-8">
                  
                  {/* Top Performing Projects */}
                  <div className="bg-white border border-[#E2E8F0] p-6 rounded-2xl shadow-sm">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-serif text-base font-black text-[#0D1B2A]">Top Performing Projects</h4>
                      <button onClick={()=>setActiveTab("projects")} className="text-[10px] font-bold text-[#B38F43] hover:underline">View All</button>
                    </div>

                    <div className="overflow-x-auto text-[11px]">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="border-b border-[#F1F5F9] text-[#64748B] font-bold">
                            <th className="py-2.5">Project Name</th>
                            <th className="py-2.5">Location</th>
                            <th className="py-2.5">Units Sold</th>
                            <th className="py-2.5 text-right">Revenue</th>
                            <th className="py-2.5 text-center w-28">Progress</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#F8FAFC]">
                          {projects.slice(0, 5).map((p) => (
                            <tr key={p._id} className="hover:bg-slate-50/50">
                              <td className="py-3 font-bold text-[#0d1b2a]">{p.name}</td>
                              <td className="py-3 text-[#64748B]">{p.location}</td>
                              <td className="py-3 font-bold">{p.unitsSold || 25} / {p.units}</td>
                              <td className="py-3 font-bold text-[#B38F43] text-right">{formatPrice(p.revenue || 35000000)}</td>
                              <td className="py-3 text-center">
                                <div className="w-full bg-[#F1F5F9] h-2 rounded-full overflow-hidden inline-block">
                                  <div className="bg-[#B38F43] h-full" style={{ width: `${p.completion}%` }}></div>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Recent Clients */}
                  <div className="bg-white border border-[#E2E8F0] p-6 rounded-2xl shadow-sm">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-serif text-base font-black text-[#0D1B2A]">Recent Clients</h4>
                      <button onClick={()=>setActiveTab("clients")} className="text-[10px] font-bold text-[#B38F43] hover:underline">View All</button>
                    </div>

                    <div className="overflow-x-auto text-[11px]">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="border-b border-[#F1F5F9] text-[#64748B] font-bold">
                            <th className="py-2.5">Client Name</th>
                            <th className="py-2.5">Contact</th>
                            <th className="py-2.5">Interested In</th>
                            <th className="py-2.5">Budget</th>
                            <th className="py-2.5">Status</th>
                            <th className="py-2.5">Last Contact</th>
                          </tr>
                        </thead>
                        <tbody>
                          {clients.slice(0, 3).map((cl) => (
                            <tr key={cl._id} className="border-b border-[#F8FAFC] hover:bg-slate-50/50">
                              <td className="py-3 font-bold text-[#0d1b2a]">{cl.name}</td>
                              <td className="py-3 text-[#64748B]">{cl.phone}</td>
                              <td className="py-3">{cl.interestedIn}</td>
                              <td className="py-3 font-bold text-[#B38F43]">{formatPrice(cl.budget)}</td>
                              <td className="py-3">
                                <span className={`px-2.5 py-1 rounded-full text-[9px] font-black uppercase ${
                                  cl.status === "Under Negotiation" ? "bg-blue-50 text-blue-600 border border-blue-100" :
                                  cl.status === "New Lead" ? "bg-emerald-50 text-emerald-600 border border-emerald-100" :
                                  "bg-amber-50 text-amber-600 border border-amber-100"
                                }`}>
                                  {cl.status}
                                </span>
                              </td>
                              <td className="py-3 text-[#94A3B8]">{new Date(cl.lastContact).toLocaleDateString()}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                </div>

                {/* Right Column (4 cols): AI Insight, Leads by Source, Recent Activity */}
                <div className="xl:col-span-4 space-y-8">
                  
                  {/* AI Market Insight Card */}
                  <div className="bg-[#FAF9F6] border border-[#E2E8F0] p-6 rounded-2xl shadow-sm relative overflow-hidden flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <h4 className="font-serif text-base font-black text-[#0D1B2A]">AI Market Insight</h4>
                        <span className="text-[8px] font-black uppercase tracking-wider bg-[#B38F43] text-white px-2 py-0.5 rounded">BETA</span>
                      </div>
                      <p className="text-xs text-[#64748B] leading-relaxed">
                        Property prices in Ahmedabad have increased by 12.4% in the last 30 days. 3 BHK apartments in Shela are in highest demand.
                      </p>
                      
                      {/* Graphics bar block */}
                      <div className="flex justify-start gap-1 bg-white p-3 rounded-2xl shadow-inner border border-slate-100 w-32">
                        <span className="w-4 h-12 bg-[#B38F43]/40 rounded-t"></span>
                        <span className="w-4 h-16 bg-[#B38F43]/70 rounded-t"></span>
                        <span className="w-4 h-20 bg-[#B38F43] rounded-t"></span>
                      </div>
                    </div>
                    
                    <button 
                      onClick={()=>setActiveTab("marketinsights")}
                      className="text-xs font-black text-[#B38F43] hover:underline flex items-center gap-1 mt-4"
                    >
                      View Full Insight <ChevronRight size={14} />
                    </button>
                  </div>

                  {/* Leads by Source Bar Chart */}
                  <div className="bg-white border border-[#E2E8F0] p-6 rounded-2xl shadow-sm">
                    <h4 className="font-serif text-base font-black text-[#0D1B2A] mb-4">Leads by Source</h4>
                    
                    <div className="flex justify-between items-end h-40 pt-4 px-2">
                      {[
                        { label: "Website", val: 420, max: 450, color: "bg-[#B38F43]" },
                        { label: "Referral", val: 320, max: 450, color: "bg-[#10B981]" },
                        { label: "Social", val: 250, max: 450, color: "bg-[#3B82F6]" },
                        { label: "Walk-in", val: 156, max: 450, color: "bg-[#8B5CF6]" },
                        { label: "Others", val: 100, max: 450, color: "bg-[#94A3B8]" }
                      ].map((item, idx) => (
                        <div key={idx} className="flex flex-col items-center gap-2 w-10">
                          <span className="text-[9px] font-bold text-[#0D1B2A]">{item.val}</span>
                          <div className="w-4 bg-slate-100 rounded-t-lg h-24 relative overflow-hidden flex items-end">
                            <div className={`w-full rounded-t-lg ${item.color}`} style={{ height: `${(item.val / item.max) * 100}%` }}></div>
                          </div>
                          <span className="text-[8px] text-[#64748B] font-bold mt-1 text-center truncate w-full">{item.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recent Activity */}
                  <div className="bg-white border border-[#E2E8F0] p-6 rounded-2xl shadow-sm space-y-4">
                    <div className="flex justify-between items-center">
                      <h4 className="font-serif text-base font-black text-[#0D1B2A]">Recent Activity</h4>
                      <button onClick={()=>setActiveTab("inquiries")} className="text-[10px] font-bold text-[#B38F43] hover:underline">View All</button>
                    </div>

                    <div className="space-y-4 text-xs">
                      {[
                        { title: 'New property "4 BHK Villa in Shela" added by you', time: "2 min ago" },
                        { title: 'Client Meeting with Vikram Shah scheduled tomorrow', time: "1 hr ago" },
                        { title: 'Payment of ₹2.4 Cr received from Karan Developers', time: "3 hr ago" },
                        { title: "New lead from Website 'Dream Villa Inquiry'", time: "5 hr ago" },
                        { title: 'Document "Sale Agreement.pdf" uploaded', time: "1 day ago" }
                      ].map((act, idx) => (
                        <div key={idx} className="flex gap-2.5 items-start">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#B38F43] mt-1.5 shrink-0"></span>
                          <div>
                            <p className="text-[#0d1b2a] leading-normal">{act.title}</p>
                            <p className="text-[9px] text-[#94A3B8] mt-0.5">{act.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Quick Actions Panel */}
                  <div className="bg-white border border-[#E2E8F0] p-6 rounded-2xl shadow-sm space-y-4">
                    <h4 className="font-serif text-base font-black text-[#0D1B2A]">Quick Actions</h4>
                    
                    <div className="grid grid-cols-2 gap-3.5">
                      <button 
                        onClick={() => setIsPropertyModalOpen(true)}
                        className="p-3 border border-[#E2E8F0] hover:border-[#B38F43] hover:bg-[#FAF9F6] transition-all rounded-xl flex flex-col items-center gap-1 text-center cursor-pointer shadow-sm"
                      >
                        <PlusCircle size={18} className="text-[#B38F43]" />
                        <span className="text-[10px] font-bold text-[#0D1B2A]">Add Property</span>
                      </button>
                      <button 
                        onClick={() => setIsClientModalOpen(true)}
                        className="p-3 border border-[#E2E8F0] hover:border-[#B38F43] hover:bg-[#FAF9F6] transition-all rounded-xl flex flex-col items-center gap-1 text-center cursor-pointer shadow-sm"
                      >
                        <PlusCircle size={18} className="text-[#B38F43]" />
                        <span className="text-[10px] font-bold text-[#0D1B2A]">Add Client</span>
                      </button>
                      <button 
                        onClick={() => setIsProjectModalOpen(true)}
                        className="p-3 border border-[#E2E8F0] hover:border-[#B38F43] hover:bg-[#FAF9F6] transition-all rounded-xl flex flex-col items-center gap-1 text-center cursor-pointer shadow-sm"
                      >
                        <PlusCircle size={18} className="text-[#B38F43]" />
                        <span className="text-[10px] font-bold text-[#0D1B2A]">New Project</span>
                      </button>
                      <button 
                        onClick={() => setIsTaskModalOpen(true)}
                        className="p-3 border border-[#E2E8F0] hover:border-[#B38F43] hover:bg-[#FAF9F6] transition-all rounded-xl flex flex-col items-center gap-1 text-center cursor-pointer shadow-sm"
                      >
                        <PlusCircle size={18} className="text-[#B38F43]" />
                        <span className="text-[10px] font-bold text-[#0D1B2A]">Add Task</span>
                      </button>
                      <button 
                        onClick={() => setIsVisitModalOpen(true)}
                        className="p-3 border border-[#E2E8F0] hover:border-[#B38F43] hover:bg-[#FAF9F6] transition-all rounded-xl flex flex-col items-center gap-1 text-center cursor-pointer shadow-sm"
                      >
                        <Calendar size={18} className="text-[#B38F43]" />
                        <span className="text-[10px] font-bold text-[#0D1B2A]">Schedule Visit</span>
                      </button>
                      <button 
                        onClick={handleGenerateReport}
                        className="p-3 border border-[#E2E8F0] hover:border-[#B38F43] hover:bg-[#FAF9F6] transition-all rounded-xl flex flex-col items-center gap-1 text-center cursor-pointer shadow-sm"
                      >
                        <FileText size={18} className="text-[#B38F43]" />
                        <span className="text-[10px] font-bold text-[#0D1B2A]">Generate Report</span>
                      </button>
                    </div>
                  </div>

                </div>

              </div>

            </div>
          )}

          {/* TAB 2: PROPERTIES */}
          {activeTab === "properties" && (
            <div className="bg-white rounded-3xl border border-[#E2E8F0] p-8 shadow-sm space-y-8 animate-fade-in">
              <div className="flex justify-between items-center border-b border-[#E2E8F0] pb-4">
                <h3 className="font-serif text-lg font-black text-[#0D1B2A]">Properties Portfolio Catalog</h3>
                <span className="text-xs text-[#64748B] font-bold">Total Matches: {liveProperties.length}</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {liveProperties.map((p) => (
                  <div key={p._id} className="border border-[#E2E8F0] rounded-3xl overflow-hidden hover:shadow-lg transition-all group flex flex-col justify-between bg-[#F8FAFC]/40">
                    <div className="relative h-44">
                      <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                      <button 
                        onClick={() => handleToggleWishlist(p.id)}
                        className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/95 hover:bg-white flex items-center justify-center text-red-500 shadow transition-colors cursor-pointer"
                      >
                        <Heart size={14} fill={wishlistItems.some(item => item.id === p.id) ? "currentColor" : "none"} />
                      </button>
                    </div>
                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <p className="text-xs text-[#B38F43] font-black font-ui uppercase tracking-wider">{p.locality}, {p.city}</p>
                        <h4 className="font-serif font-black text-[#0D1B2A] text-sm mt-1 leading-tight">{p.title}</h4>
                        <p className="text-[10px] text-[#64748B] mt-1">{p.beds} BHK · {p.area} sqft · {p.status}</p>
                      </div>
                      
                      <div className="mt-4 pt-4 border-t border-[#E2E8F0] flex justify-between items-center">
                        <span className="font-serif font-black text-[#B38F43] text-base">{formatPrice(p.price)}</span>
                        <Link 
                          href={`/listing/${p.id}`}
                          className="px-4 py-2 bg-[#0d1b2a] hover:bg-[#1c3a5e] text-white text-xs font-bold rounded-xl transition-all"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: CLIENTS & LEADS */}
          {activeTab === "clients" && (
            <div className="bg-white rounded-3xl border border-[#E2E8F0] p-8 shadow-sm space-y-6 animate-fade-in">
              <div className="flex justify-between items-center border-b border-[#E2E8F0] pb-4">
                <h3 className="font-serif text-lg font-black text-[#0D1B2A]">Clients & Lead Registry</h3>
                <button onClick={() => setIsClientModalOpen(true)} className="px-4 py-2 bg-[#B38F43] hover:bg-[#967431] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-sm">
                  <Plus size={14} /> Add Client
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {clients.map((cl) => (
                  <div key={cl._id} className="p-5 border border-[#E2E8F0] bg-[#FAF9F6]/20 rounded-2xl space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-sm font-bold text-[#0D1B2A]">{cl.name}</h4>
                        <p className="text-[10px] text-[#64748B] mt-0.5">{cl.phone}</p>
                      </div>
                      <span className={`px-2.5 py-1 rounded-full text-[9px] font-black uppercase ${
                        cl.status === "Under Negotiation" ? "bg-blue-50 text-blue-600 border border-blue-100" :
                        cl.status === "New Lead" ? "bg-emerald-50 text-emerald-600 border border-emerald-100" :
                        "bg-amber-50 text-amber-600 border border-amber-100"
                      }`}>
                        {cl.status}
                      </span>
                    </div>

                    <div className="text-[11px] text-[#555] space-y-1.5 border-t border-[#F1F5F9] pt-3">
                      <p className="flex justify-between">Interested In: <span className="font-bold text-[#0d1b2a]">{cl.interestedIn}</span></p>
                      <p className="flex justify-between">Budget Limit: <span className="font-bold text-[#B38F43]">{formatPrice(cl.budget)}</span></p>
                      <p className="flex justify-between text-[#94A3B8]">Last Contact: <span>{new Date(cl.lastContact).toLocaleDateString()}</span></p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: PROJECTS */}
          {activeTab === "projects" && (
            <div className="bg-white rounded-3xl border border-[#E2E8F0] p-8 shadow-sm space-y-8 animate-fade-in">
              <div className="flex justify-between items-center border-b border-[#E2E8F0] pb-4">
                <h3 className="font-serif text-lg font-black text-[#0D1B2A]">Developer New Launches</h3>
                <button onClick={() => setIsProjectModalOpen(true)} className="px-4 py-2 bg-[#B38F43] hover:bg-[#967431] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-sm">
                  <Plus size={14} /> New Project
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((p) => (
                  <div key={p._id} className="border border-[#E2E8F0] rounded-3xl overflow-hidden hover:shadow-lg transition-all flex flex-col justify-between bg-[#F8FAFC]/40">
                    <div className="relative h-40">
                      <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                      <span className="absolute top-3 left-3 text-[9px] font-black uppercase tracking-wider bg-emerald-600 text-white px-2.5 py-1 rounded">
                        {p.status}
                      </span>
                    </div>
                    <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                      <div>
                        <p className="text-xs text-[#B38F43] font-bold uppercase tracking-wider">{p.builder}</p>
                        <h4 className="font-serif font-black text-[#0D1B2A] text-base leading-tight mt-1">{p.name}</h4>
                        <p className="text-[10px] text-[#64748B] mt-1">{p.location}</p>
                      </div>

                      <div className="border-t border-[#F1F5F9] pt-3 text-[11px] space-y-2">
                        <div className="flex justify-between">
                          <span>Progress ({p.completion}%)</span>
                          <span className="font-bold">{p.unitsSold || 25} / {p.units} units sold</span>
                        </div>
                        <div className="w-full bg-[#F1F5F9] h-2 rounded-full overflow-hidden">
                          <div className="bg-[#B38F43] h-full" style={{ width: `${p.completion}%` }}></div>
                        </div>
                      </div>

                      <div className="pt-2 flex justify-between items-center">
                        <span className="font-serif font-black text-[#0D1B2A]">{p.priceDisplay}</span>
                        <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">{p.types}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: INVESTMENTS */}
          {activeTab === "investments" && (
            <div className="bg-white rounded-3xl border border-[#E2E8F0] p-8 shadow-sm space-y-8 animate-fade-in">
              <h3 className="font-serif text-lg font-black text-[#0D1B2A] border-b border-[#E2E8F0] pb-4">Strategic Real Estate Investments</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="border border-[#E2E8F0] p-6 rounded-3xl bg-[#FAF9F6]/40 space-y-4">
                  <h4 className="text-xs font-black text-[#0D1B2A] uppercase tracking-wider">Compound Annual ROI Calculator</h4>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-xs font-bold mb-1">
                        <span>Investment Limit</span>
                        <span className="text-[#B38F43]">₹18.6 L</span>
                      </div>
                    </div>

                    <div className="p-4 bg-white border border-[#E2E8F0] rounded-2xl text-[11px] space-y-2">
                      <p className="flex justify-between">Average ROI: <span className="font-bold text-emerald-600">+12.8%</span></p>
                      <p className="flex justify-between">Expected 5 Yr Valuation: <span className="font-bold text-[#0D1B2A]">₹33.95 L</span></p>
                    </div>
                  </div>
                </div>

                <div className="bg-[#0d1b2a] text-white p-6 rounded-3xl space-y-4 flex flex-col justify-between">
                  <div>
                    <h4 className="text-xs font-black uppercase tracking-wider text-[#B38F43]">Active Fractional Portfolios</h4>
                    <p className="text-xs text-white/70 mt-2 leading-relaxed">
                      Invest fractionally in foreclosed properties or premium commercial lands for high dividend payouts.
                    </p>
                  </div>
                  <button onClick={() => setActiveTab("properties")} className="w-full py-2.5 bg-[#B38F43] hover:bg-[#967431] text-white text-xs font-black uppercase rounded-xl transition-all shadow cursor-pointer">
                    Browse Fractional Listings
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: FINANCIALS */}
          {activeTab === "financials" && (
            <div className="bg-white rounded-3xl border border-[#E2E8F0] p-8 shadow-sm space-y-8 animate-fade-in">
              <h3 className="font-serif text-lg font-black text-[#0D1B2A] border-b border-[#E2E8F0] pb-4">Financials Mortgage Calculator</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="border border-[#E2E8F0] p-6 bg-[#FAF9F6]/40 rounded-3xl space-y-4">
                  <h4 className="text-xs font-black text-[#0D1B2A] uppercase tracking-wider">Home Loan EMI</h4>
                  <div className="space-y-4 text-xs">
                    <div>
                      <div className="flex justify-between font-bold mb-1">
                        <span>Capital Loan Amount</span>
                        <span>₹{(emiLoan / 100000).toFixed(0)} L</span>
                      </div>
                      <input 
                        type="range" min={1000000} max={100000000} step={1000000} value={emiLoan}
                        onChange={(e)=>setEmiLoan(Number(e.target.value))}
                        className="w-full accent-[#B38F43]"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="font-bold block mb-1">Interest Rate (%)</label>
                        <input type="number" step={0.1} value={emiRate} onChange={(e)=>setEmiRate(Number(e.target.value))} className="w-full border border-[#E2E8F0] bg-white px-3 py-2 rounded-xl" />
                      </div>
                      <div>
                        <label className="font-bold block mb-1">Tenure (Years)</label>
                        <input type="number" value={emiTenure} onChange={(e)=>setEmiTenure(Number(e.target.value))} className="w-full border border-[#E2E8F0] bg-white px-3 py-2 rounded-xl" />
                      </div>
                    </div>

                    <div className="p-4 bg-white rounded-2xl border border-slate-100 flex justify-between items-center">
                      <div>
                        <span className="text-[9px] text-[#94A3B8] block font-bold uppercase">Monthly Payment</span>
                        <span className="font-serif text-lg font-black text-[#B38F43]">₹{emiMonthly.toLocaleString("en-IN")}</span>
                      </div>
                      <span className="text-[8px] font-black uppercase bg-emerald-50 text-emerald-600 border border-emerald-100 px-2.5 py-1 rounded">Approved</span>
                    </div>
                  </div>
                </div>

                <div className="border border-[#E2E8F0] p-6 bg-[#FAF9F6]/40 rounded-3xl space-y-4">
                  <h4 className="text-xs font-black text-[#0D1B2A] uppercase tracking-wider">Government Stamp Duty & Fees</h4>
                  <div className="space-y-3.5 text-xs text-[#555]">
                    <div className="flex justify-between border-b border-[#F1F5F9] pb-2"><span>Property market estimation:</span> <span className="font-bold">₹60,00,000</span></div>
                    <div className="flex justify-between border-b border-[#F1F5F9] pb-2"><span>Stamp Duty charge (4.9%):</span> <span className="font-bold">₹2,94,000</span></div>
                    <div className="flex justify-between border-b border-[#F1F5F9] pb-2"><span>Registration charge (1.0%):</span> <span className="font-bold">₹60,000</span></div>
                    <div className="flex justify-between bg-[#B38F43]/10 text-[#0d1b2a] p-3 rounded-xl font-bold"><span>Total Gov Fees:</span> <span className="text-[#B38F43]">₹3,54,000</span></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: AI MATCH CENTER */}
          {activeTab === "aimatch" && (
            <div className="bg-white rounded-3xl border border-[#E2E8F0] p-8 shadow-sm space-y-8 animate-fade-in">
              <h3 className="font-serif text-lg font-black text-[#0D1B2A] border-b border-[#E2E8F0] pb-4">AI NeuroMatch Questionnaire</h3>
              <p className="text-xs text-[#64748B]">Fill details to get matched properties instantly.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
                <div>
                  <label className="font-bold block mb-2">Target Budget</label>
                  <select className="w-full border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-3 rounded-xl">
                    <option>Under ₹80 L</option>
                    <option>₹80 L - ₹1.5 Cr</option>
                    <option>₹1.5 Cr - ₹3 Cr</option>
                    <option>Above ₹3 Cr</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold block mb-2">BHK configuration</label>
                  <select className="w-full border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-3 rounded-xl">
                    <option>2 BHK</option>
                    <option>3 BHK</option>
                    <option>4 BHK / Villa</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold block mb-2">Locality</label>
                  <select className="w-full border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-3 rounded-xl">
                    <option>Ahmedabad (Bopal/Shela)</option>
                    <option>Pune (Koregaon Park)</option>
                  </select>
                </div>
              </div>

              <button 
                onClick={() => {
                  showMsg("Scanning listings using NeuroMatch AI...");
                }}
                className="px-6 py-3 bg-[#B38F43] hover:bg-[#967431] text-white text-xs font-black uppercase rounded-xl transition-all shadow-md flex items-center gap-2"
              >
                Find AI Property Match <Brain size={14} />
              </button>
            </div>
          )}

          {/* TAB 8: SMART MAP */}
          {activeTab === "smartmap" && (
            <div className="bg-white rounded-3xl border border-[#E2E8F0] p-8 shadow-sm space-y-6 animate-fade-in">
              <h3 className="font-serif text-lg font-black text-[#0D1B2A] border-b border-[#E2E8F0] pb-4">Smart Intelligence Map Heatmap</h3>
              
              <div className="h-[450px] bg-slate-100 border border-[#E2E8F0] rounded-3xl overflow-hidden relative">
                <div className="absolute inset-0 bg-grid-slate-200 opacity-[0.5] bg-[size:16px_16px]"></div>
                <div className="absolute top-1/3 left-1/3 w-3 h-3 bg-[#B38F43] rounded-full border-2 border-white animate-ping"></div>
                <div className="absolute top-1/3 left-1/3 w-3.5 h-3.5 bg-[#B38F43] rounded-full border-2 border-white shadow"></div>
                
                <div className="absolute bottom-6 left-6 right-6 bg-white/95 border border-[#E2E8F0] p-4.5 rounded-2xl shadow-xl">
                  <h4 className="font-serif text-xs font-black text-[#0D1B2A]">Bopal Crossroads, Ahmedabad</h4>
                  <p className="text-[10px] text-[#64748B] mt-1">Prime high-growth commercial node. Capital appreciation rate: +14.5% y/y.</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 9: MARKET INSIGHTS */}
          {activeTab === "marketinsights" && (
            <div className="bg-white rounded-3xl border border-[#E2E8F0] p-8 shadow-sm space-y-8 animate-fade-in">
              <h3 className="font-serif text-lg font-black text-[#0D1B2A] border-b border-[#E2E8F0] pb-4">Predictive Analytics & PriceOracle AI</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="border border-[#E2E8F0] p-6 rounded-3xl bg-[#FAF9F6]/40 space-y-4">
                  <h4 className="text-xs font-black text-[#0D1B2A] uppercase tracking-wider">Predictive Price Calculator</h4>
                  
                  <div className="space-y-4 text-xs">
                    <div>
                      <label className="font-bold block mb-1">Locality</label>
                      <input type="text" value={oracleLocality} onChange={(e)=>setOracleLocality(e.target.value)} className="w-full border border-[#E2E8F0] bg-white px-3 py-2 rounded-lg" />
                    </div>

                    <div className="p-4 bg-white rounded-2xl border border-slate-100 space-y-2">
                      <p className="flex justify-between">Estimated valuation: <span className="font-bold text-[#B38F43]">{oracleResult.min} - {oracleResult.max}</span></p>
                      <p className="flex justify-between">Confidence: <span className="font-bold text-emerald-600">{oracleResult.confidence}</span></p>
                      <p className="text-[10px] text-[#64748B] border-t border-[#F1F5F9] pt-2 mt-1">{oracleResult.recommendation}</p>
                    </div>
                  </div>
                </div>

                {/* Chat assistant in marketinsights */}
                <div className="border border-[#E2E8F0] p-6 rounded-3xl bg-[#FAF9F6]/40 flex flex-col justify-between space-y-4">
                  <h4 className="text-xs font-black text-[#0D1B2A] uppercase tracking-wider">NexBot Market Specialist</h4>
                  <div className="h-40 overflow-y-auto border border-[#E2E8F0] bg-[#F8FAFC] rounded-2xl p-3 space-y-2 text-[11px] leading-relaxed scrollbar-hide">
                    {chatLog.map((chat, idx) => (
                      <div key={idx} className={`p-2 rounded-xl max-w-[85%] ${
                        chat.sender === "user" ? "bg-[#B38F43] text-white ml-auto rounded-tr-none" : "bg-white border border-[#E2E8F0] mr-auto rounded-tl-none"
                      }`}>
                        {chat.text}
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <input type="text" placeholder="Ask about Bopal property prices..." value={chatInput} onChange={(e)=>setChatInput(e.target.value)} onKeyDown={(e)=>{if(e.key==="Enter")handleChatSend();}} className="flex-1 border border-[#E2E8F0] px-3.5 py-1.5 rounded-xl text-xs bg-white text-[#0D1B2A]" />
                    <button onClick={handleChatSend} className="p-2 bg-[#B38F43] hover:bg-[#967431] text-white rounded-xl shadow-sm"><Send size={14} /></button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 10: TASK MANAGER */}
          {activeTab === "taskmanager" && (
            <div className="bg-white rounded-3xl border border-[#E2E8F0] p-8 shadow-sm space-y-8 animate-fade-in">
              <div className="flex justify-between items-center border-b border-[#E2E8F0] pb-4">
                <h3 className="font-serif text-lg font-black text-[#0D1B2A]">Agent Tasks Agenda</h3>
                <button onClick={() => setIsTaskModalOpen(true)} className="px-4 py-2 bg-[#B38F43] hover:bg-[#967431] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-sm">
                  <Plus size={14} /> Add Task
                </button>
              </div>

              <div className="space-y-4">
                {tasks.map((t) => (
                  <div key={t._id} className="p-4 border border-[#E2E8F0] bg-[#FAF9F6]/20 rounded-2xl flex justify-between items-center">
                    <div>
                      <h4 className="text-xs font-bold text-[#0D1B2A]">{t.title}</h4>
                      <p className="text-[10px] text-[#94A3B8] mt-1">Due Date: {new Date(t.dueDate).toLocaleDateString()}</p>
                    </div>

                    <span className="px-2.5 py-1 rounded-full text-[9px] font-black bg-amber-50 text-amber-600 border border-amber-100 uppercase">
                      {t.status}
                    </span>
                  </div>
                ))}

                {tasks.length === 0 && (
                  <div className="text-center py-12 text-[#64748B] text-sm">
                    All tasks completed! Schedule new tasks to monitor follow-ups.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 11: DOCUMENTS */}
          {activeTab === "documents" && (
            <div className="bg-white rounded-3xl border border-[#E2E8F0] p-8 shadow-sm space-y-8 animate-fade-in">
              <h3 className="font-serif text-lg font-black text-[#0D1B2A] border-b border-[#E2E8F0] pb-4">DigiDeed Document Center</h3>
              
              <div className="border border-dashed border-[#E2E8F0] p-12 rounded-3xl text-center space-y-3 max-w-lg mx-auto bg-[#FAF9F6]/30">
                <FileText size={40} className="text-[#B38F43] mx-auto" />
                <h4 className="text-sm font-bold text-[#0d1b2a]">Sale Agreement & Deed E-Sign</h4>
                <p className="text-xs text-[#64748B] max-w-sm mx-auto">Digitally sign sale agreements, lease contracts, and property allotment forms with government verified certifications.</p>
                <button 
                  onClick={() => {
                    showMsg("E-Sign service is active. Please choose document in detail catalog.");
                  }}
                  className="px-6 py-2.5 bg-[#B38F43] hover:bg-[#967431] text-white text-xs font-black uppercase rounded-xl transition-all shadow cursor-pointer"
                >
                  Access DigiDeed Box
                </button>
              </div>
            </div>
          )}

          {/* TAB 12: REPORTS */}
          {activeTab === "reports" && (
            <div className="bg-white rounded-3xl border border-[#E2E8F0] p-8 shadow-sm space-y-8 animate-fade-in">
              <h3 className="font-serif text-lg font-black text-[#0D1B2A] border-b border-[#E2E8F0] pb-4">Reports Ledger</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl">
                <div className="p-6 border border-[#E2E8F0] rounded-3xl bg-[#FAF9F6]/30 space-y-3">
                  <BarChart3 size={32} className="text-[#B38F43]" />
                  <h4 className="text-sm font-bold text-[#0d1b2a]">Property Listings Export</h4>
                  <p className="text-xs text-[#64748B]">Download full property catalog details (prices, cities, beds, area) as a Microsoft Excel/CSV compatible file.</p>
                  <button onClick={handleGenerateReport} className="px-5 py-2.5 bg-[#B38F43] hover:bg-[#967431] text-white text-xs font-bold rounded-xl shadow cursor-pointer">
                    Export Property CSV
                  </button>
                </div>

                <div className="p-6 border border-[#E2E8F0] rounded-3xl bg-[#FAF9F6]/30 space-y-3">
                  <Users size={32} className="text-[#B38F43]" />
                  <h4 className="text-sm font-bold text-[#0d1b2a]">Clients Database Export</h4>
                  <p className="text-xs text-[#64748B]">Download all client details (contacts, interest, budgets) as a structured spreadsheet.</p>
                  <button 
                    onClick={() => {
                      if(clients.length===0){showMsg("No client entries to export.", "error"); return;}
                      const headers = "ID,Name,Phone,Email,Interest,Budget,Status\n";
                      const rows = clients.map(cl => `${cl.id},"${cl.name}",${cl.phone},"${cl.email||""}","${cl.interestedIn}",${cl.budget},"${cl.status}"`).join("\n");
                      const blob = new Blob([headers + rows], {type:"text/csv"});
                      const url = URL.createObjectURL(blob);
                      const link = document.createElement("a");
                      link.href = url;
                      link.download = `DreamHome_Clients_Ledger_${new Date().toISOString().slice(0,10)}.csv`;
                      link.click();
                      showMsg("Client spreadsheet generated!");
                    }} 
                    className="px-5 py-2.5 bg-[#0d1b2a] hover:bg-[#1c3a5e] text-white text-xs font-bold rounded-xl shadow cursor-pointer"
                  >
                    Export Client CSV
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 13: SETTINGS */}
          {activeTab === "settings" && (
            <div className="bg-white rounded-3xl border border-[#E2E8F0] p-8 shadow-sm space-y-8 animate-fade-in">
              <h3 className="font-serif text-lg font-black text-[#0D1B2A] border-b border-[#E2E8F0] pb-4">General Preferences</h3>
              
              <div className="max-w-md space-y-6 text-xs text-[#0D1B2A]">
                <div className="flex items-center justify-between py-2 border-b border-slate-100">
                  <div>
                    <h4 className="font-bold">Email Alerts</h4>
                    <p className="text-[10px] text-[#64748B] mt-0.5">Receive daily notifications of new properties.</p>
                  </div>
                  <input type="checkbox" defaultChecked className="accent-[#B38F43] rounded" />
                </div>
                <div className="flex items-center justify-between py-2 border-b border-slate-100">
                  <div>
                    <h4 className="font-bold">SMS Notifications</h4>
                    <p className="text-[10px] text-[#64748B] mt-0.5">Receive reminders before scheduled visits.</p>
                  </div>
                  <input type="checkbox" defaultChecked className="accent-[#B38F43] rounded" />
                </div>
                
                <button onClick={() => showMsg("Preferences updated!")} className="px-6 py-2.5 bg-[#B38F43] hover:bg-[#967431] text-white font-bold rounded-xl transition-all cursor-pointer">
                  Save Settings
                </button>
              </div>
            </div>
          )}

        </div>

      </div>

      {/* ═══════════════════════════════════════════════════════════════
          MOBILE MENU DRAWER
          ═══════════════════════════════════════════════════════════════ */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-black/60 z-50 flex">
          <div className="w-[260px] bg-[#0D1B2A] h-full p-6 flex flex-col justify-between text-white">
            <div className="space-y-6">
              <div className="flex justify-between items-center pb-4 border-b border-[#1C3A5E]">
                <img src="/dream home logo.png" alt="Logo" className="h-9 w-auto" />
                <button onClick={() => setMobileMenuOpen(false)} className="text-white hover:text-[#B38F43]">
                  <X size={18} />
                </button>
              </div>
              <nav className="space-y-2">
                {SIDEBAR_ITEMS.map((item) => {
                  const isActive = activeTab === item.id;
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveTab(item.id);
                        setMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center justify-between gap-3 px-4 py-3 rounded-xl text-xs font-bold font-ui transition-all text-left ${
                        isActive ? "bg-[#B38F43] text-white" : "text-white/70 hover:bg-[#1C3A5E]"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon size={16} />
                        <span>{item.label}</span>
                      </div>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>
          <div className="flex-1" onClick={() => setMobileMenuOpen(false)}></div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════
          QUICK ACTION MODALS
          ═══════════════════════════════════════════════════════════════ */}
      
      {/* 1. ADD PROPERTY MODAL */}
      {isPropertyModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[85vh] overflow-y-auto p-8 shadow-2xl space-y-6">
            <div className="flex justify-between items-center border-b border-[#E2E8F0] pb-4">
              <h3 className="font-serif text-lg font-black text-[#0D1B2A]">Post New Property</h3>
              <button onClick={() => setIsPropertyModalOpen(false)} className="text-[#64748B] hover:text-[#B38F43] cursor-pointer">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleAddProperty} className="space-y-4 text-xs text-[#0D1B2A]">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="font-bold block mb-1">Property Title</label>
                  <input type="text" required value={propTitle} onChange={(e)=>setPropTitle(e.target.value)} placeholder="e.g. Dream Villa Residences" className="w-full border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-2.5 rounded-xl" />
                </div>
                <div>
                  <label className="font-bold block mb-1">Price (INR)</label>
                  <input type="number" required value={propPrice} onChange={(e)=>setPropPrice(e.target.value)} placeholder="e.g. 68000000" className="w-full border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-2.5 rounded-xl" />
                </div>
                <div>
                  <label className="font-bold block mb-1">Super Area (sq.ft.)</label>
                  <input type="number" required value={propArea} onChange={(e)=>setPropArea(e.target.value)} placeholder="e.g. 1850" className="w-full border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-2.5 rounded-xl" />
                </div>
                <div>
                  <label className="font-bold block mb-1">Property Type</label>
                  <select value={propType} onChange={(e)=>setPropType(e.target.value)} className="w-full border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-2.5 rounded-xl">
                    <option value="Apartment">Apartment</option>
                    <option value="Villa">Villa</option>
                    <option value="Penthouse">Penthouse</option>
                    <option value="Plot">Plot</option>
                    <option value="Commercial">Commercial</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold block mb-1">Status</label>
                  <select value={propStatus} onChange={(e)=>setPropStatus(e.target.value)} className="w-full border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-2.5 rounded-xl">
                    <option value="Ready to Move">Ready to Move</option>
                    <option value="Under Construction">Under Construction</option>
                    <option value="New Launch">New Launch</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold block mb-1">Bedrooms</label>
                  <select value={propBeds} onChange={(e)=>setPropBeds(e.target.value)} className="w-full border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-2.5 rounded-xl">
                    <option value="1">1 BHK</option>
                    <option value="2">2 BHK</option>
                    <option value="3">3 BHK</option>
                    <option value="4">4 BHK</option>
                    <option value="5">5+ BHK</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold block mb-1">Bathrooms</label>
                  <select value={propBaths} onChange={(e)=>setPropBaths(e.target.value)} className="w-full border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-2.5 rounded-xl">
                    <option value="1">1 Bath</option>
                    <option value="2">2 Baths</option>
                    <option value="3">3 Baths</option>
                    <option value="4">4 Baths</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold block mb-1">Locality</label>
                  <input type="text" required value={propLocality} onChange={(e)=>setPropLocality(e.target.value)} placeholder="e.g. Shela" className="w-full border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-2.5 rounded-xl" />
                </div>
                <div>
                  <label className="font-bold block mb-1">City</label>
                  <input type="text" required value={propCity} onChange={(e)=>setPropCity(e.target.value)} className="w-full border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-2.5 rounded-xl" />
                </div>
                <div className="col-span-2">
                  <label className="font-bold block mb-1">Full Address</label>
                  <input type="text" required value={propLocation} onChange={(e)=>setPropLocation(e.target.value)} placeholder="e.g. Shela Road, Ahmedabad" className="w-full border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-2.5 rounded-xl" />
                </div>
                <div>
                  <label className="font-bold block mb-1">Image URL</label>
                  <input type="text" required value={propImage} onChange={(e)=>setPropImage(e.target.value)} className="w-full border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-2.5 rounded-xl" />
                </div>
                <div>
                  <label className="font-bold block mb-1">RERA register ID</label>
                  <input type="text" value={propRera} onChange={(e)=>setPropRera(e.target.value)} placeholder="e.g. PR/GJ/AHM/425" className="w-full border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-2.5 rounded-xl" />
                </div>
                <div className="col-span-2">
                  <label className="font-bold block mb-1">Description</label>
                  <textarea value={propDescription} onChange={(e)=>setPropDescription(e.target.value)} placeholder="Enter details..." className="w-full border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-2 rounded-xl h-20 resize-none" />
                </div>
              </div>
              <div className="flex gap-3 justify-end pt-4 border-t border-[#E2E8F0]">
                <button type="button" onClick={()=>setIsPropertyModalOpen(false)} className="px-5 py-2.5 border border-[#E2E8F0] rounded-xl font-bold">Cancel</button>
                <button type="submit" disabled={actionLoading} className="px-6 py-2.5 bg-[#B38F43] hover:bg-[#967431] text-white font-bold rounded-xl">{actionLoading ? "Submitting..." : "Post Listing"}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 2. ADD CLIENT MODAL */}
      {isClientModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-md p-8 shadow-2xl space-y-6 text-xs text-[#0D1B2A]">
            <div className="flex justify-between items-center border-b border-[#E2E8F0] pb-4">
              <h3 className="font-serif text-lg font-black">Register Client Lead</h3>
              <button onClick={()=>setIsClientModalOpen(false)} className="text-[#64748B] hover:text-[#B38F43] cursor-pointer"><X size={20} /></button>
            </div>
            <form onSubmit={handleAddClient} className="space-y-4">
              <div>
                <label className="font-bold block mb-1">Client Name</label>
                <input type="text" required value={clientName} onChange={(e)=>setClientName(e.target.value)} placeholder="e.g. Vikram Shah" className="w-full border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-2.5 rounded-xl" />
              </div>
              <div>
                <label className="font-bold block mb-1">Phone Number</label>
                <input type="text" required value={clientPhone} onChange={(e)=>setClientPhone(e.target.value)} placeholder="e.g. +91 98765 43210" className="w-full border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-2.5 rounded-xl" />
              </div>
              <div>
                <label className="font-bold block mb-1">Email (Optional)</label>
                <input type="email" value={clientEmail} onChange={(e)=>setClientEmail(e.target.value)} placeholder="e.g. vikram@shah.com" className="w-full border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-2.5 rounded-xl" />
              </div>
              <div>
                <label className="font-bold block mb-1">Interested In</label>
                <input type="text" required value={clientIntProp} onChange={(e)=>setClientIntProp(e.target.value)} className="w-full border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-2.5 rounded-xl" />
              </div>
              <div>
                <label className="font-bold block mb-1">Budget Limit (INR)</label>
                <input type="number" required value={clientBudget} onChange={(e)=>setClientBudget(e.target.value)} placeholder="e.g. 35000000" className="w-full border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-2.5 rounded-xl" />
              </div>
              <div>
                <label className="font-bold block mb-1">Lead Status</label>
                <select value={clientStatus} onChange={(e)=>setClientStatus(e.target.value)} className="w-full border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-2.5 rounded-xl">
                  <option value="New Lead">New Lead</option>
                  <option value="Under Negotiation">Under Negotiation</option>
                  <option value="Site Visit Done">Site Visit Done</option>
                </select>
              </div>

              <div className="flex gap-3 justify-end pt-4 border-t border-[#E2E8F0]">
                <button type="button" onClick={()=>setIsClientModalOpen(false)} className="px-5 py-2.5 border border-[#E2E8F0] rounded-xl font-bold">Cancel</button>
                <button type="submit" disabled={actionLoading} className="px-6 py-2.5 bg-[#B38F43] hover:bg-[#967431] text-white font-bold rounded-xl">Register Client</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 3. NEW PROJECT MODAL */}
      {isProjectModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-md p-8 shadow-2xl space-y-6 text-xs text-[#0D1B2A]">
            <div className="flex justify-between items-center border-b border-[#E2E8F0] pb-4">
              <h3 className="font-serif text-lg font-black">Launch Developer Project</h3>
              <button onClick={()=>setIsProjectModalOpen(false)} className="text-[#64748B] hover:text-[#B38F43] cursor-pointer"><X size={20} /></button>
            </div>
            <form onSubmit={handleAddProject} className="space-y-4">
              <div>
                <label className="font-bold block mb-1">Project Name</label>
                <input type="text" required value={projName} onChange={(e)=>setProjName(e.target.value)} placeholder="e.g. Greenwood Enclave" className="w-full border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-2.5 rounded-xl" />
              </div>
              <div>
                <label className="font-bold block mb-1">Builder/Developer Group</label>
                <input type="text" required value={projBuilder} onChange={(e)=>setProjBuilder(e.target.value)} placeholder="e.g. Prestige Group" className="w-full border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-2.5 rounded-xl" />
              </div>
              <div>
                <label className="font-bold block mb-1">Starting Price (INR)</label>
                <input type="number" required value={projPrice} onChange={(e)=>setProjPrice(e.target.value)} placeholder="e.g. 18000000" className="w-full border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-2.5 rounded-xl" />
              </div>
              <div>
                <label className="font-bold block mb-1">Locality</label>
                <input type="text" required value={projLocation} onChange={(e)=>setProjLocation(e.target.value)} placeholder="e.g. Gota, Ahmedabad" className="w-full border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-2.5 rounded-xl" />
              </div>
              <div>
                <label className="font-bold block mb-1">Total Units Count</label>
                <input type="number" value={projUnits} onChange={(e)=>setProjUnits(e.target.value)} placeholder="e.g. 50" className="w-full border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-2.5 rounded-xl" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-bold block mb-1">Completion Status (%)</label>
                  <input type="number" min={0} max={100} value={projCompletion} onChange={(e)=>setProjCompletion(e.target.value)} className="w-full border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-2.5 rounded-xl" />
                </div>
                <div>
                  <label className="font-bold block mb-1">Status</label>
                  <select value={projStatus} onChange={(e)=>setProjStatus(e.target.value)} className="w-full border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-2.5 rounded-xl">
                    <option value="Under Construction">Under Construction</option>
                    <option value="Ready to Move">Ready to Move</option>
                    <option value="New Launch">New Launch</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="font-bold block mb-1">Configuration Types</label>
                <input type="text" value={projTypes} onChange={(e)=>setProjTypes(e.target.value)} className="w-full border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-2.5 rounded-xl" />
              </div>
              <div className="flex gap-3 justify-end pt-4 border-t border-[#E2E8F0]">
                <button type="button" onClick={()=>setIsProjectModalOpen(false)} className="px-5 py-2.5 border border-[#E2E8F0] rounded-xl font-bold">Cancel</button>
                <button type="submit" disabled={actionLoading} className="px-6 py-2.5 bg-[#B38F43] hover:bg-[#967431] text-white font-bold rounded-xl">Create Project</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 4. ADD TASK MODAL */}
      {isTaskModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-sm p-8 shadow-2xl space-y-6 text-xs text-[#0D1B2A]">
            <div className="flex justify-between items-center border-b border-[#E2E8F0] pb-4">
              <h3 className="font-serif text-lg font-black">Add Agenda Task</h3>
              <button onClick={()=>setIsTaskModalOpen(false)} className="text-[#64748B] hover:text-[#B38F43] cursor-pointer"><X size={20} /></button>
            </div>
            <form onSubmit={handleAddTask} className="space-y-4">
              <div>
                <label className="font-bold block mb-1">Task Title</label>
                <input type="text" required value={taskTitle} onChange={(e)=>setTaskTitle(e.target.value)} placeholder="e.g. Follow up with Vikram Shah" className="w-full border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-2.5 rounded-xl" />
              </div>
              <div>
                <label className="font-bold block mb-1">Due Date</label>
                <input type="date" required value={taskDueDate} onChange={(e)=>setTaskDueDate(e.target.value)} className="w-full border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-2.5 rounded-xl" />
              </div>
              <div className="flex gap-3 justify-end pt-4 border-t border-[#E2E8F0]">
                <button type="button" onClick={()=>setIsTaskModalOpen(false)} className="px-5 py-2.5 border border-[#E2E8F0] rounded-xl font-bold">Cancel</button>
                <button type="submit" disabled={actionLoading} className="px-6 py-2.5 bg-[#B38F43] hover:bg-[#967431] text-white font-bold rounded-xl">Add Task</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 5. SCHEDULE VISIT MODAL */}
      {isVisitModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-md p-8 shadow-2xl space-y-6 text-xs text-[#0D1B2A]">
            <div className="flex justify-between items-center border-b border-[#E2E8F0] pb-4">
              <h3 className="font-serif text-lg font-black">Schedule Site Visit</h3>
              <button onClick={()=>setIsVisitModalOpen(false)} className="text-[#64748B] hover:text-[#B38F43] cursor-pointer"><X size={20} /></button>
            </div>
            <form onSubmit={handleAddVisit} className="space-y-4">
              <div>
                <label className="font-bold block mb-1">Visitor Name</label>
                <input type="text" required value={visitName} onChange={(e)=>setVisitName(e.target.value)} placeholder="e.g. Neha Patel" className="w-full border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-2.5 rounded-xl" />
              </div>
              <div>
                <label className="font-bold block mb-1">Phone Number</label>
                <input type="text" required value={visitPhone} onChange={(e)=>setVisitPhone(e.target.value)} placeholder="e.g. +91 91234 56789" className="w-full border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-2.5 rounded-xl" />
              </div>
              <div>
                <label className="font-bold block mb-1">Target Property</label>
                <select value={visitPropId} onChange={(e)=>setVisitPropId(e.target.value)} className="w-full border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-2.5 rounded-xl">
                  <option value="">Select Property...</option>
                  {liveProperties.map(p => (
                    <option key={p._id} value={p.id}>{p.title} ({p.locality})</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="font-bold block mb-1">Visit Date</label>
                <input type="date" required value={visitDate} onChange={(e)=>setVisitDate(e.target.value)} className="w-full border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-2.5 rounded-xl" />
              </div>
              <div>
                <label className="font-bold block mb-1">Special Message / Instructions</label>
                <textarea value={visitMessage} onChange={(e)=>setVisitMessage(e.target.value)} placeholder="e.g. Prefers morning visit..." className="w-full border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-2 rounded-xl h-20 resize-none" />
              </div>

              <div className="flex gap-3 justify-end pt-4 border-t border-[#E2E8F0]">
                <button type="button" onClick={()=>setIsVisitModalOpen(false)} className="px-5 py-2.5 border border-[#E2E8F0] rounded-xl font-bold">Cancel</button>
                <button type="submit" disabled={actionLoading} className="px-6 py-2.5 bg-[#B38F43] hover:bg-[#967431] text-white font-bold rounded-xl">Schedule</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </main>
  );
}