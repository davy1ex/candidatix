import {useResume} from '@/entities/resume'

type CreateResumeInput = {
    title: string;
    skills: string;
    workExperience: string;
    experienceYears: number;

}

export const useCreateNewResume = () => {
    const {addResume} = useResume()

    const createResume = async (resumeData: CreateResumeInput) => {
        const skillsTag = resumeData.skills.split(',').map(skill => skill.trim())
        await addResume({...resumeData, skillsTag})
    }

    return createResume
}