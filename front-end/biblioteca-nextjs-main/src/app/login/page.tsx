"use client";

const Login = () => {
    return (
        <div className="grid place-items-center h-screen">
            <div className="bg-white shadow-lg rounded p-8 w-96"> {/* Container do formulário */}
                <h2 className="text-center text-2xl mb-4">Login</h2>
                <input
                    type="text"
                    placeholder="Usuário"
                    className="w-full p-2 mb-4 border rounded"
                />
                <input
                    type="password"
                    placeholder="Senha"
                    className="w-full p-2 mb-4 border rounded"
                />
                <button className="bg-blue-500 text-white px-4 py-2 rounded w-full">
                    Entrar
                </button>
            </div>
        </div>
    );
};

export default Login;
