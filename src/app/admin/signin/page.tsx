import SignInForm from "@/components/shared/sign-in-form";

export default function AdminSignIn() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="text-center text-3xl font-bold text-white">
            Admin Sign In
          </h2>
          <p className="text-center text-muted-foreground">
            Secure access to your portfolio dashboard
          </p>
        </div>
        <SignInForm />
      </div>
    </div>
  );
}