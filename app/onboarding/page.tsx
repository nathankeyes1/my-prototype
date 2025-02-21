import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Progress } from "../../components/ui/progress"

export default function Onboarding() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="w-full max-w-md space-y-8">
        {/* Progress Bar */}
        <div className="space-y-2">
          <Progress value={25} className="w-full" />
          <p className="text-sm text-muted-foreground text-right">Step 1 of 4</p>
        </div>

        {/* Header Content */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight">
            Please provide us your name
          </h1>
          <p className="text-muted-foreground">
            As it appears on your ID
          </p>
        </div>
        
        {/* Input Fields */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Input 
              type="text" 
              placeholder="First name" 
              className="w-full"
            />
          </div>
          
          <div className="space-y-2">
            <Input 
              type="text" 
              placeholder="Middle name (optional)" 
              className="w-full"
            />
          </div>
          
          <div className="space-y-2">
            <Input 
              type="text" 
              placeholder="Last name" 
              className="w-full"
            />
          </div>
          
          <Button className="w-full mt-6">
            Continue
          </Button>
        </div>
      </div>
    </main>
  )
} 