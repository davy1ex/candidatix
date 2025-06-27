import { Button } from "./button";

interface CopyToClipboardButtonProps {
    response: string
}

export const CopyToClipboardButton = ({response}: CopyToClipboardButtonProps) => {
    return (
        <Button
            variant="ghost"
            size="sm"
            onClick={() => {
                navigator.clipboard.writeText(response) // TODO Add Toaster about copynig to clipboard
            }}
      >
        📋
      </Button>
    )
}