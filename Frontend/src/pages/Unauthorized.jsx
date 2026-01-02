const Unauthorized = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-slate-50">
            <div className="text-center">
                <h2 className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-rose-500 to-orange-400">Unauthorized</h2>
                <p className="text-slate-600 mt-2">You don’t have access to this page.</p>
            </div>
        </div>
    )
}

export default Unauthorized;