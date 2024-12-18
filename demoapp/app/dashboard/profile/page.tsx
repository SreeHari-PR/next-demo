"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Upload, Eye, Trash2 } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {  useSelector } from "react-redux"
import { RootState } from "@/utils/redux/store"
import { selectIsAuthenticated, selectUser } from "@/utils/redux/authslice"
import { useRouter } from "next/navigation";

interface Wallet {
  points: number;
  liva: number;
  liva_blocks: number;
}

interface KYCDetails {
  verified: boolean;
}

interface BankDetails {
  verified: boolean;
}

interface TypeInfo {
  _id: string;
  title: string;
  type_id: number;
  deleted: boolean;
  __v: number;
  createdAt: string;
  updatedAt: string;
}

interface AdminData {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  wallet: Wallet;
  kyc_details: KYCDetails;
  bank_details: BankDetails;
  short_code: string;
  currency_code: string;
  country_code: string;
  timezone: string;
  active: boolean;
  type: TypeInfo;
  deleted: boolean;
  __v: number;
  createdAt: string;
  updatedAt: string;
  rank: string;
}




export default function ProfileForm() {
  const token = useSelector((state: RootState) => state.auth.token)
  const user = useSelector(selectUser)
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const router = useRouter();

 
  if (!isAuthenticated) {
    router.push("/login");
    return null;  
  }




  return (
    <div className="min-h-screen bg-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-slate-900 rounded-lg shadow-xl p-6 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-[120px_1fr] gap-8">
          <Avatar className="w-[120px] h-[120px] mx-auto md:mx-0 mt-10">
            <AvatarImage
              src="/avatar-1.avif"
              alt="Profile"
              className="bg-gradient-to-b from-yellow-400 to-blue-500"
            />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="grid gap-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm text-gray-400">Name</label>
                <Input
                  placeholder="John Doe"
                  value={user?.first_name}
                  className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gray-400">Home / Office Address</label>
                <Input
                  placeholder="Wall street, 12th Avenue"
                  className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm text-gray-400">Email</label>
                <Input
                  type="email"
                  value={user?.email}
                  placeholder="johndoe@gmail.com"
                  className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm text-gray-400">City</label>
                  <Input
                    placeholder="Cochin"
                    className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-gray-400">Country</label>
                  <Input
                    placeholder="India"
                    className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                  />
                </div>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm text-gray-400">Phone Number</label>
                <Input
                  placeholder="+91 9085478512"
                  className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gray-400">PIN / ZIP Code</label>
                <Input
                  placeholder="682030"
                  className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-white">Banking Details</h3>
            <div className="grid gap-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <Input
                  placeholder="Bank Name"
                  className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                />
                <Input
                  placeholder="Account Holder"
                  className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <Input
                  placeholder="Account Number"
                  className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                />
                <Input
                  placeholder="IFSC Code"
                  className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                />
              </div>
              <Input
                placeholder="Branch"
                className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium text-white">Advertisement Details</h3>
            <Input
              placeholder="Maximum space/story views"
              className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
            />
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium text-white">KYC Documents</h3>
            <p className="text-sm text-gray-400">Upload the required documents to complete KYC verification</p>
            <div className="grid sm:grid-cols-2 gap-8">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-300">1. Pan Card</span>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 px-2 text-blue-400 hover:text-blue-300 hover:bg-blue-900/50"
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 px-2 text-red-400 hover:text-red-300 hover:bg-red-900/50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-300">2. Photograph</span>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 px-2 text-blue-400 hover:text-blue-300 hover:bg-blue-900/50"
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 px-2 text-red-400 hover:text-red-300 hover:bg-red-900/50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-300">3. Adhaar Card</span>
                    <span className="text-xs text-yellow-500">*Required</span>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 px-2 text-blue-400 hover:text-blue-300 hover:bg-blue-900/50"
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 px-2 text-red-400 hover:text-red-300 hover:bg-red-900/50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <Input
                  placeholder="Select document to upload"
                  className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                />
                <Button className="w-full bg-gray-700 hover:bg-gray-600 text-gray-200 justify-center gap-2">
                  <Upload className="w-4 h-4" />
                  Upload Document
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            Save & Update
          </Button>
        </div>
      </div>
    </div>
  )
}

