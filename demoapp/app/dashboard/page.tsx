'use client';

import { KycAlert } from "@/components/overview/kyc-alert";
import { StatsCards } from "@/components/overview/stats-cards";
import { ReferCard } from "@/components/overview/refer-card";
import { RewardsChart } from "@/components/overview/reward-charts";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/utils/redux/store";
import { addUser } from "@/utils/redux/authslice";
import { fetchProfile } from '@/utils/services/profileService';

interface AdminData {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  wallet: {
    points: number;
    liva: number;
    liva_blocks: number;
  };
  kyc_details: {
    verified: boolean;
  };
  bank_details: {
    verified: boolean;
  };
  short_code: string;
  currency_code: string;
  country_code: string;
  timezone: string;
  active: boolean;
  type: {
    _id: string;
    title: string;
    type_id: number;
    deleted: boolean;
    createdAt: string;
    updatedAt: string;
  };
  deleted: boolean;
  createdAt: string;
  updatedAt: string;
  rank: string;
}

export default function DashboardPage() {
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.auth.token);
  const [profile, setProfile] = useState<AdminData | null>(null);

  useEffect(() => {
    const getProfile = async () => {
      try {
        const profileData = await fetchProfile(token as string);
        setProfile(profileData);
        dispatch(addUser(profileData));
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    if (token) {
      getProfile();
    }
  }, [token, dispatch]);

  return (
    <div className="space-y-6">
      {profile && <KycAlert kycDetails={profile.kyc_details} />}
      {profile && <StatsCards wallet={profile.wallet} />}
      <div className="grid gap-6 md:grid-cols-2">
        {profile && <ReferCard shortCode={profile.short_code} />}
        {profile && <RewardsChart wallet={profile.wallet} />}
      </div>
    </div>
  );
}
