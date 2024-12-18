"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CuboidIcon as Cube, Medal, Info } from 'lucide-react'
import { WalletCard } from "./wallet-card"
import { Modal, ModalContent, ModalHeader, ModalTitle } from "@/components/ui/modal"

interface WalletProps {
  points: number
  liva: number
  liva_blocks: number
}

interface StatsCardsProps {
  wallet: WalletProps
}

export function StatsCards({ wallet }: StatsCardsProps) {
  const { points, liva, liva_blocks } = wallet
  const [activeWallet, setActiveWallet] = useState<string | null>(null)

  const handleOpenWallet = (walletName: string) => {
    setActiveWallet(walletName)
  }

  const handleCloseWallet = () => {
    setActiveWallet(null)
  }

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-blue-600 p-4 border-0">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0">
              <Cube className="h-8 w-8 text-white" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1">
                <h3 className="text-base font-medium text-white">Liva Blocks</h3>
              </div>
              <p className="text-2xl font-bold text-white">{liva_blocks}</p>
              <p className="text-sm text-blue-100/90">85 Points for next block</p>
            </div>
          </div>
        </Card>

        <Card className="bg-[#1a1d24] p-4 border-0">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0">
                <div className="rounded-full bg-yellow-500/20 p-1">
                  <Medal className="h-6 w-6 text-yellow-500" />
                </div>
              </div>
              <div className="min-w-0">
                <h3 className="text-base font-medium text-white">Community Member</h3>
                <div className="text-sm text-gray-400">
                  <p>Rank: 110</p>
                  <p>Points: {points.toFixed(4)}</p>
                </div>
              </div>
            </div>
            <Button className="w-full bg-blue-600 text-white hover:bg-blue-700">
              Upgrade
            </Button>
          </div>
        </Card>

        <Card className="bg-[#1a1d24] p-4 border-0">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-medium text-white">Profitex Wallet</h3>
              <div className="flex items-center gap-2">
                <Info className="h-4 w-4 text-gray-400" />
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-auto p-0 text-emerald-400 hover:text-emerald-300 hover:bg-transparent"
                  onClick={() => handleOpenWallet("Profitex Wallet")}
                >
                  View
                </Button>
              </div>
            </div>
            <div>
              <p className="text-lg font-semibold text-white">{liva.toFixed(2)} LIVA</p>
              <p className="text-sm text-gray-400">$ 25000</p>
            </div>
          </div>
        </Card>

        <Card className="bg-[#1a1d24] p-4 border-0">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-medium text-white">Mining Wallet</h3>
              <div className="flex items-center gap-2">
                <Info className="h-4 w-4 text-gray-400" />
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-auto p-0 text-emerald-400 hover:text-emerald-300 hover:bg-transparent"
                  onClick={() => handleOpenWallet("Mining Wallet")}
                >
                  View
                </Button>
              </div>
            </div>
            <div>
              <p className="text-lg font-semibold text-white">{liva.toFixed(2)} LIVA</p>
              <p className="text-sm text-gray-400">$ 25000</p>
            </div>
          </div>
        </Card>
      </div>

      <Modal open={activeWallet !== null} onOpenChange={handleCloseWallet}>
        <ModalContent>
          <ModalHeader>
            <ModalTitle>{activeWallet}</ModalTitle>
          </ModalHeader>
          {activeWallet && (
            <WalletCard
              name={activeWallet}
              balance={activeWallet === "Profitex Wallet" ? 25000 : 25000}
            />
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

