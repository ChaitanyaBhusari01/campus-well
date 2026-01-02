import DashboardLayout from "@/layouts/DashboardLayout";

const StudentDashboard = () => {
    return (
        <div className="p-6">
            <h1 className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-teal-400 mb-4">
                Welcome to your dashboard
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="card-glow p-4 rounded-xl fade-in-up">Quick Actions</div>
                <div className="card-glow p-4 rounded-xl fade-in-up" style={{ animationDelay: '80ms' }}>Recent Activity</div>
            </div>
        </div>
    );
};

export default StudentDashboard;