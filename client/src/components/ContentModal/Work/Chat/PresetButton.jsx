// PresetButton.js
import { Button } from "@heroui/react"

export function PresetButton({ response, onClick }) {
  return (
    <Button
      variant="solid"
      size="lg"
      onPress={() => onClick(response)}
      color="default"
      className="w-full m-auto text-wrap"
    >
      {response.content}
    </Button>
  )
}
