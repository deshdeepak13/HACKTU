import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { AlertCircle, CheckCircle, Edit3, HelpCircle, Home, List, BookOpen, Loader2, Clock } from "lucide-react";
import { db, doc, getDoc } from "../../../firebase"; // Firestore import
import { useAuth } from "@/contexts/LoanContext"; // Get userId from context
import { useNavigate } from "react-router-dom";
import moment from "moment"; // ✅ Import moment.js for date formatting

// Import your components here
import Dashboard from "../Dashboard";
import PersonalisedLoan from "./PersonalisedLoan";
import ActiveLoans from "./ActiveLoans";
import PastLoans from "./PastLoans";
import Help from "./Help";
import Notifications from "./Notifications";
import UserHome from "./UserHome";
import Chatbot from "../Chatbot";

export default function User() {
  const [selectedTab, setSelectedTab] = useState("Dashboard");
  const { id: userId, user } = useAuth(); // Get userId from context
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;

    const fetchUserData = async () => {
      try {
        const userRef = doc(db, "loanApplications", userId);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          setUserData(userSnap.data());
        } else {
          console.error("No user data found");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  const LoanProgress = ({ value }: { value: number }) => (
    <Progress value={value} className="h-3 bg-primary/10 [&>div]:bg-primary" />
  );
  console.log(userData?.status)
  const renderStatusMessage = () => {
    if (!userData) return <p className="text-gray-600">Fetching your application status...</p>;
    // if (userData.status === undefined) return <p className="text-gray-600">Fetching your application status...</p>;
    if (userData.status === null) return (
      <div className="p-4 bg-green-50 border border-green-400 text-green-800 rounded-lg flex items-center">
        <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
        Your application has been approved! 🎉
      </div>);

const status = userData?.status ? userData.status.trim() : "Unknown";
switch (status)  {

      case "Video Verification Requested":
        return (
          <div className="p-4 bg-yellow-50 border border-yellow-400  rounded-lg flex justify-between items-center">
            <span>Please submit a verification video for final confirmation.</span>
            <Button className="bg-black text-white" onClick={() => navigate("/video")} variant="outline">
              Go to Video KYC
            </Button>
          </div>
        );
      case "Approved":
        return (
          <div className="p-4 bg-green-50 border border-green-400 text-green-800 rounded-lg flex items-center">
            <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
            Your application has been approved! 🎉
          </div>
        );
      case "Rejected":
        return (
          <div className="p-4 bg-red-50 border border-red-400 text-red-800 rounded-lg flex items-center">
            <AlertCircle className="w-5 h-5 mr-2 text-red-600" />
            Unfortunately, your application was rejected.
          </div>
        );
      default:
        return <p className="text-gray-600">Fetching your application status...</p>;
    }
  };
  // Right after you retrieve userData:
  const createdAtValue = userData?.createdAt;
  let formattedCreatedAt = "Unknown";
  if (createdAtValue) {
    // If it's a Firestore Timestamp, it'll have a toDate() method
    if (createdAtValue.toDate) {
      formattedCreatedAt = moment(createdAtValue.toDate()).format("MMMM Do YYYY, h:mm A");
    } else {
      // Otherwise, treat it as a normal date or string
      formattedCreatedAt = moment(createdAtValue).format("MMMM Do YYYY, h:mm A");
    }
  }
  console.log(user)
  const menuItems = [
    { name: "Home", icon: <Home size={18} />, component: <UserHome /> },
    { name: "Dashboard", icon: <CheckCircle size={18} />, component: <Dashboard /> },
    { name: "Personalized Loans", icon: <BookOpen size={18} />, component: <PersonalisedLoan /> },
    { name: "Active Loans", icon: <List size={18} />, component: <ActiveLoans /> },
    { name: "Past Loans", icon: <List size={18} />, component: <PastLoans /> },
    { name: "Need Help", icon: <HelpCircle size={18} />, component: <Help /> },
    { name: "Notifications", icon: <Edit3 size={18} />, component: <Notifications /> },
  ];

  return (
    <div className="container mx-auto p-6 flex gap-6">
      {/* Sidebar Navigation */}
      <aside className="w-72 bg-gray-100 p-4 rounded-lg shadow-lg hidden lg:block">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">Navigation</h2>
        <ul className="space-y-3 text-sm">
          {menuItems.map((item) => (
            <li
              key={item.name}
              className={`flex items-center gap-3 px-4 py-3 rounded-md cursor-pointer transition font-medium text-gray-700 ${selectedTab === item.name ? "bg-blue-600 text-white shadow-md" : "hover:bg-gray-200"
                }`}
              onClick={() => setSelectedTab(item.name)}
            >
              {item.icon} {item.name}
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 space-y-6">
        {/* Application Status Message */}
        <Card className="p-5 border border-gray-200 rounded-lg shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-800">Application Status</CardTitle>
          </CardHeader>
          <CardContent>{loading ? <Loader2 className="animate-spin" /> : renderStatusMessage()}</CardContent>
        </Card>

        {/* Loan Progress Card */}
        {userData && userData.progress !== undefined && (
          <Card className="p-5 border border-gray-200 rounded-lg shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-800">Loan Application Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <LoanProgress value={userData.progress || 0} />
              <p className="mt-2 text-gray-600">{userData.progress}% completed</p>
            </CardContent>
          </Card>
        )}

        {/* Application Submitted Time */}
        {userData?.createdAt && (
          <Card className="p-5 border border-gray-200 rounded-lg shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-800">Application Submitted</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center gap-3 text-gray-600">
              <Clock className="w-5 h-5 text-gray-500" />
              <span>{formattedCreatedAt}</span>
            </CardContent>
          </Card>
        )}

        {/* Dynamically Render Selected Component */}
        {menuItems.find((item) => item.name === selectedTab)?.component}
      </div>

      {/* Chatbot Integration */}
      <Chatbot />
    </div>
  );
}
