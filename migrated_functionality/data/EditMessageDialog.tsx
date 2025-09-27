import { useState, useEffect, useRef } from 'react'
import { useTranslation } from '@/i18n/react-i18next-compat'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogClose,
  DialogFooter,
  DialogHeader,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { IconPencil, IconX } from '@tabler/icons-react'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'

interface EditMessageDialogProps {
  message: string
  imageUrls?: string[]
  onSave: (message: string, imageUrls?: string[]) => void
  triggerElement?: React.ReactNode
}

export function EditMessageDialog({
  message,
  imageUrls,
  onSave,
  triggerElement,
}: EditMessageDialogProps) {
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const [draft, setDraft] = useState(message)
  const [keptImages, setKeptImages] = useState<string[]>(imageUrls || [])
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    setDraft(message)
    setKeptImages(imageUrls || [])
  }, [message, imageUrls])

  useEffect(() => {
    if (isOpen && textareaRef.current) {
      setTimeout(() => {
        textareaRef.current?.focus()
        textareaRef.current?.select()
      }, 100)
    }
  }, [isOpen])

  const handleSave = () => {
    const hasTextChanged = draft !== message && draft.trim()
    const hasImageChanged =
      JSON.stringify(imageUrls || []) !== JSON.stringify(keptImages)

    if (hasTextChanged || hasImageChanged) {
      onSave(
        draft.trim() || message,
        keptImages.length > 0 ? keptImages : undefined
      )
      setIsOpen(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    e.stopPropagation()
    if (e.key === 'Enter' && e.ctrlKey) {
      handleSave()
    }
  }

  const defaultTrigger = (
    <Tooltip>
      <TooltipTrigger asChild>
        <div
          className="flex outline-0 items-center gap-1 hover:text-accent transition-colors cursor-pointer group relative"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              setIsOpen(true)
            }
          }}
        >
          <IconPencil size={16} />
        </div>
      </TooltipTrigger>
      <TooltipContent>
        <p>{t('edit')}</p>
      </TooltipContent>
    </Tooltip>
  )

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>{triggerElement || defaultTrigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('common:dialogs.editMessage.title')}</DialogTitle>
          {keptImages.length > 0 && (
            <div className="mt-2 space-y-2">
              <div className="flex gap-3 flex-wrap">
                {keptImages.map((imageUrl, index) => (
                  <div
                    key={index}
                    className="relative border border-main-view-fg/5 rounded-lg size-14"
                  >
                    <img
                      className="object-cover w-full h-full rounded-lg"
                      src={imageUrl}
                      alt={`Attached image ${index + 1}`}
                    />
                    <div
                      className="absolute -top-1 -right-2.5 bg-destructive size-5 flex rounded-full items-center justify-center cursor-pointer"
                      onClick={() =>
                        setKeptImages((prev) =>
                          prev.filter((_, i) => i !== index)
                        )
                      }
                    >
                      <IconX className="text-destructive-fg" size={16} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          <Textarea
            ref={textareaRef}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            className="mt-2 resize-none w-full min-h-24"
            onKeyDown={handleKeyDown}
            placeholder={t('common:dialogs.editMessage.title')}
            aria-label={t('common:dialogs.editMessage.title')}
          />
          <DialogFooter className="mt-4 flex flex-col-reverse sm:flex-row sm:justify-end gap-2">
            <DialogClose asChild>
              <Button variant="link" size="sm" className="w-full sm:w-auto">
                {t('common:cancel')}
              </Button>
            </DialogClose>
            <Button
              disabled={
                draft === message &&
                JSON.stringify(imageUrls || []) ===
                  JSON.stringify(keptImages) &&
                !draft.trim()
              }
              onClick={handleSave}
              size="sm"
              className="w-full sm:w-auto"
            >
              {t('common:save')}
            </Button>
          </DialogFooter>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
