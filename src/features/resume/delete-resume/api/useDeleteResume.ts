import {useResume} from '@/entities/resume'

export const useDeleteResume = () => {
    const {deleteResume} = useResume();

    const removeResume = async (resumeId: string) => {
        await deleteResume(resumeId);
    }
    return removeResume
}