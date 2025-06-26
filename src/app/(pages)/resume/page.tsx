import { Button } from "@/shared/ui/button";
import { ResumeDetail } from "@/features/resume-detail/server";
import { getResumeById } from "@/entities/resume/model/server";

export default async function ResumePage()  {
    const resume = await getResumeById("1") || null

    return (
        <>
            <Button>Create resume</Button>
            <ResumeDetail resume={resume}  />
        </>
    )
}