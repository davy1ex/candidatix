import { Resume } from "@/entities/resume/model/types"

interface ResumeDetailProps {
    resume: Resume | null
}

export const ResumeDetail = ({resume}:ResumeDetailProps)  => {
    if (resume == null) return "Error"

    return (
        <div className="border p-4 rounded ">
            <h3 className="text-lg font-semibold">{resume.title}</h3>
            <p>Expierence: {resume.experienceYears} year</p>
            <div className="text-sm text-muted-foreground">
                {resume.skillsTag.map((skill) => (
                <div key={skill}>• {skill}</div>
                ))}
            </div>
            <div className="text-m">
                <pre>
                    {resume.workExperience}
                </pre>
            </div>
        </div>
    )
}