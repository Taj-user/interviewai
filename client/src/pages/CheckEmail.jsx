export default function CheckEmail() {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-950 text-white px-6 text-center gap-4">
        <h1 className="text-3xl font-bold">Check your email</h1>
        <p className="text-gray-400 max-w-sm">
          We sent a verification link to your email. Click it to activate your account and get started.
        </p>
      </div>
    )
  }