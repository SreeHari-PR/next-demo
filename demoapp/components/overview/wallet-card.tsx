"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { WalletDialog } from "./wallet-dialog"

interface WalletCardProps {
  balance: number
  name: string
}

export function WalletCard({ balance, name }: WalletCardProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <>
      <Card className="bg-[#1a1d24] p-6 border-0">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-b from-green-400 to-green-600 flex items-center justify-center">
            <span className="text-2xl font-bold text-white">$</span>
          </div>
          <h2 className="text-xl font-semibold text-white">{name}</h2>
          <p className="text-gray-400">Available balance: ${balance}</p>
          <div className="grid grid-cols-2 gap-3 w-full">
            <Button 
              onClick={() => setIsDialogOpen(true)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Deposit
            </Button>
            <Button 
              variant="outline"
              className="border-gray-700 text-gray-300 hover:bg-gray-800"
            >
              Withdraw
            </Button>
          </div>
          <Button 
            variant="secondary"
            className="w-full bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20"
          >
            Convert to Liva
          </Button>
        </div>
      </Card>

      <WalletDialog 
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        walletName={name}
      />
    </>
  )
}

