"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"

interface WalletDialogProps {
  isOpen: boolean
  onClose: () => void
  walletName: string
}

export function WalletDialog({ isOpen, onClose, walletName }: WalletDialogProps) {
  const [amount, setAmount] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#1a1d24] border-gray-800 text-white">
        <DialogHeader>
          <DialogTitle>Deposit to {walletName}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="number"
            placeholder="Enter amount to deposit"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="bg-[#2a2d34] border-gray-700 text-white placeholder:text-gray-400"
          />
          <div className="flex flex-col gap-2">
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
              Submit
            </Button>
            <Button
              type="button"
              variant="ghost"
              onClick={onClose}
              className="w-full text-gray-400 hover:text-gray-300 hover:bg-gray-800"
            >
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

