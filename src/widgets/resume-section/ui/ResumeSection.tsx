import { useState } from "react";
import { CreateResumeModal } from '@/entities/resume/ui/CreateResumeModal';
import { ResumeCard } from "@/entities/resume/ui/ResumeCard";
import { Button } from "@/shared/ui/button";

export const ResumeSection = () => {
    const [isOpenModalCreateResume, setIsOpenModalCreateResume] = useState(false)

    return (
        <>
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-4">
                    <ResumeCard />
                    <Button 
                        onClick={() => setIsOpenModalCreateResume(true)}
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                    Create New Resume
                    </Button>
                </div>
            </div>
            <CreateResumeModal 
                open={isOpenModalCreateResume} 
                onOpenChange={setIsOpenModalCreateResume}
            />
        </>

    )
}