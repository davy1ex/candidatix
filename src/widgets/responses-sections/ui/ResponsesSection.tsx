import { useState } from "react";

import { Button } from "@/shared/ui/button";
import { ResponsesList } from "@/features/response/response-list";
import { CreateResponseModal } from "@/features/response/response-modal";

export const ResponseSection = () => {
  const [isCreateResponseModalOpen, setIsCreateResponseModalOpen] = useState(false);

  return (
    <>
      <div className="mb-8">      
        <h2 className="text-2xl font-semibold mb-4 hover:underline cursor-pointer">
          Responses
        </h2>
        
        <Button 
          onClick={() => setIsCreateResponseModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          Add New Response
        </Button>

        <ResponsesList />
      </div>

      <CreateResponseModal 
        open={isCreateResponseModalOpen} 
        onOpenChange={setIsCreateResponseModalOpen}
      />
      
    </>
    )
}