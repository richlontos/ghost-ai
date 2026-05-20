"use client"

import { Minus, Maximize, Plus, Undo2, Redo2 } from "lucide-react"

interface CanvasControlsProps {
  onZoomOut: () => void
  onFitView: () => void
  onZoomIn: () => void
  onUndo: () => void
  onRedo: () => void
  canUndo: boolean
  canRedo: boolean
}

export function CanvasControls({
  onZoomOut,
  onFitView,
  onZoomIn,
  onUndo,
  onRedo,
  canUndo,
  canRedo,
}: CanvasControlsProps) {
  return (
    <div className="fixed bottom-[calc(env(safe-area-inset-bottom)+5rem)] left-1/2 z-40 flex -translate-x-1/2 items-center gap-0.5 rounded-full border border-border-default bg-bg-surface/95 px-2 py-1.5 shadow-xl backdrop-blur-xl sm:bottom-4 sm:left-4 sm:translate-x-0">
      <ControlButton onClick={onZoomOut} title="Zoom out">
        <Minus className="h-3.5 w-3.5" />
      </ControlButton>
      <ControlButton onClick={onFitView} title="Fit view">
        <Maximize className="h-3.5 w-3.5" />
      </ControlButton>
      <ControlButton onClick={onZoomIn} title="Zoom in">
        <Plus className="h-3.5 w-3.5" />
      </ControlButton>

      <div className="mx-1 h-4 w-px bg-border-default" />

      <ControlButton onClick={onUndo} title="Undo" disabled={!canUndo}>
        <Undo2 className="h-3.5 w-3.5" />
      </ControlButton>
      <ControlButton onClick={onRedo} title="Redo" disabled={!canRedo}>
        <Redo2 className="h-3.5 w-3.5" />
      </ControlButton>
    </div>
  )
}

interface ControlButtonProps {
  onClick: () => void
  title: string
  disabled?: boolean
  children: React.ReactNode
}

function ControlButton({ onClick, title, disabled, children }: ControlButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      title={title}
      aria-label={title}
      className="flex h-8 w-8 items-center justify-center rounded-full text-text-muted transition-colors hover:bg-bg-elevated hover:text-text-primary disabled:cursor-not-allowed disabled:opacity-30 sm:h-7 sm:w-7"
    >
      {children}
    </button>
  )
}
