"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Lock, Globe } from "lucide-react";
import Profile from "@/components/Profile";

export default function SettingsPage() {
  return (
    <>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-foreground">
          Settings
        </h1>
        <p className="text-muted-foreground mt-1">
          Manage platform configuration and security
        </p>
      </div>

      <Tabs defaultValue="platform" className="w-full space-y-6">
     

        {/* PLATFORM */}
        <TabsContent value="platform" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-primary" />
                General Settings
              </CardTitle>
              <CardDescription>
                Manage your platform basic information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Profile />
            </CardContent>
          </Card>
        </TabsContent>

        {/* PAYMENTS */}
        {/* <TabsContent value="payments" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-secondary" />
                Stripe Configuration
              </CardTitle>
              <CardDescription>
                Configure your payment gateway integration
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center gap-3 text-emerald-800">
                <span className="h-2 w-2 bg-emerald-500 rounded-full animate-pulse" />
                <span className="font-medium text-sm">
                  Stripe is connected (Test Mode)
                </span>
              </div>

              <div className="grid gap-2">
                <Label>Publishable Key</Label>
                <Input
                  type="password"
                  value="pk_test_51Mz..."
                  readOnly
                  className="font-mono bg-muted"
                />
              </div>

              <div className="grid gap-2">
                <Label>Secret Key</Label>
                <Input
                  type="password"
                  value="sk_test_51Mz..."
                  readOnly
                  className="font-mono bg-muted"
                />
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="border-destructive text-destructive hover:bg-destructive/10"
                >
                  Disconnect
                </Button>
                <Button>Update Keys</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent> */}

        {/* NOTIFICATIONS */}
        {/* <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-blue-500" />
                Email Notifications
              </CardTitle>
              <CardDescription>
                Control when you receive emails
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <NotificationToggle
                label="New Owner Registration"
                desc="Receive an email when a new owner signs up"
                defaultChecked
              />
              <NotificationToggle
                label="Payment Failures"
                desc="Alert when a subscription payment fails"
                defaultChecked
              />
              <NotificationToggle
                label="Weekly Reports"
                desc="Get a weekly summary of platform activity"
              />
            </CardContent>
          </Card>
        </TabsContent> */}

        {/* SECURITY */}
  
      </Tabs>
    </>
  );
}

/* Reusable toggle row */
function NotificationToggle({
  label,
  desc,
  defaultChecked,
}: {
  label: string;
  desc: string;
  defaultChecked?: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="space-y-0.5">
        <Label>{label}</Label>
        <p className="text-sm text-muted-foreground">{desc}</p>
      </div>
      <Switch defaultChecked={defaultChecked} />
    </div>
  );
}
