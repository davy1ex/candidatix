'use client'
import { Button } from "@/shared/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/shared/ui/tabs';
import {SettingsLLMProviderTab} from "./tabs/SettingsLLMProviderTab";
import {SettingsProxyTab} from "./tabs/SettingsProxyTab";
import { useSettings } from "../model/settingsStore";


export const Settings = () => {
  const {
    isOpen,
    toggleSettings, 
  } = useSettings();

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        onClick={toggleSettings}
        className="h-8"
      >
        Settings
      </Button>

      <Dialog open={isOpen} onOpenChange={toggleSettings}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Settings</DialogTitle>
          </DialogHeader>
          <Tabs defaultValue="llm">
            <TabsList className="mb-4">
              <TabsTrigger value="llm">LLM Provider</TabsTrigger>
              <TabsTrigger value="proxy">Proxy Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="llm">
              <SettingsLLMProviderTab />
            </TabsContent>
            <TabsContent value="proxy">
              <SettingsProxyTab />
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </>
  );
}
