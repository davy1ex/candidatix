import { useState } from "react";
import { CreateResumeModal } from '@/features/resume/create-resume';
import { ResumeCard } from "@/entities/resume/ui/ResumeCard";
import { Button } from "@/shared/ui/button";
import {useResume} from "@/entities/resume";
import {randomUUID} from "node:crypto";

export const ResumeSection = () => {
    const [isOpenModalCreateResume, setIsOpenModalCreateResume] = useState(false)

    const {resumes} = useResume()

    return (
        <>
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-4">
                    {resumes.map((resume) =>(
                        <ResumeCard key={resume.updatedAt} resume={resume} />
                    ))}
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