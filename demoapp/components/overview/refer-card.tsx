import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";

interface ReferCardProps {
  shortCode: string;
}

export function ReferCard({ shortCode }: ReferCardProps) {
  return (
    <Card className="bg-[#1c1f26]">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg text-white">Refer and Earn</CardTitle>
          <Button variant="ghost" size="icon">
            <Share2 className="h-4 w-4 text-gray-400" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <p className="mb-4 text-sm text-gray-400">
          Earn up to 50% by referring a user and earn a percentage while they refer another user.
        </p>
        <div className="mb-4 text-center">
          <p className="text-sm text-gray-400">Your Referral Code:</p>
          <p className="text-lg font-semibold text-blue-600">{shortCode}</p>
        </div>
        <div className="flex justify-center space-x-4">
          <div className="relative h-24 w-24 sm:h-32 sm:w-32 rounded-full border-4 border-blue-600/30">
            <div
              className="absolute inset-0.5 rounded-full border-4 border-blue-600"
              style={{ clipPath: "polygon(0 0, 100% 0, 100% 50%, 0 50%)" }}
            ></div>
          </div>
          <div className="relative h-24 w-24 sm:h-32 sm:w-32 rounded-full border-4 border-blue-600/30">
            <div
              className="absolute inset-0.5 rounded-full border-4 border-blue-600"
              style={{ clipPath: "polygon(0 0, 100% 0, 100% 25%, 0 25%)" }}
            ></div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
