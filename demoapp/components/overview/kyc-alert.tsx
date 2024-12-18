import { AlertTriangle, CheckCircle } from 'lucide-react'
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"

interface KycAlertProps {
  kycDetails: {
    verified: boolean
  }
}

export function KycAlert({ kycDetails }: KycAlertProps) {
  return (
    <Alert className={`mb-6 ${kycDetails.verified ? 'bg-green-800 border-green-600/20' : 'bg-[#1c1f26] border-yellow-600/20'}`}>
      {kycDetails.verified ? (
        <CheckCircle className="h-5 w-5 text-green-500" />
      ) : (
        <AlertTriangle className="h-5 w-5 text-yellow-500" />
      )}
      <AlertDescription className="flex flex-col items-start justify-between space-y-2 text-gray-300 sm:flex-row sm:items-center sm:space-y-0">
        <div>
          <span className={`mr-2 font-semibold ${kycDetails.verified ? 'text-green-500' : 'text-yellow-500'}`}>
            {kycDetails.verified ? 'KYC Verified' : 'Verify KYC and Bank Account'}
          </span>
          <span className="hidden sm:inline">
            {kycDetails.verified
              ? 'Your KYC and bank account have been successfully verified. You can now process deposits and withdrawals.'
              : 'KYC and your bank account verification is mandatory to process deposits and withdrawals on this platform.'}
          </span>
        </div>
        {!kycDetails.verified && (
          <Button variant="outline" className="border-yellow-500 text-yellow-500 hover:bg-yellow-500/10">
            Verify
          </Button>
        )}
      </AlertDescription>
    </Alert>
  )
}
