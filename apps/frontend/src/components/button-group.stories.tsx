import type { Meta, StoryObj } from "@storybook/react"
import { useState } from "react"
import { ButtonGroup, ButtonGroupItem } from "./button-group"

const meta: Meta<typeof ButtonGroup> = {
  title: "Components/ButtonGroup",
  component: ButtonGroup,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "outline", "secondary"],
    },
    size: {
      control: "select",
      options: ["default", "sm", "lg"],
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState("center")
    
    return (
      <ButtonGroup {...args} value={value} onValueChange={setValue}>
        <ButtonGroupItem value="left">Left</ButtonGroupItem>
        <ButtonGroupItem value="center">Center</ButtonGroupItem>
        <ButtonGroupItem value="right">Right</ButtonGroupItem>
      </ButtonGroup>
    )
  },
}

// export const Outline: Story = {
//   render: (args) => {
//     const [value, setValue] = useState("bold")
    
//     return (
//       <ButtonGroup {...args} variant="outline" value={value} onValueChange={setValue}>
//         <ButtonGroupItem value="bold">Bold</ButtonGroupItem>
//         <ButtonGroupItem value="italic">Italic</ButtonGroupItem>
//         <ButtonGroupItem value="underline">Underline</ButtonGroupItem>
//       </ButtonGroup>
//     )
//   },
// }

// export const Secondary: Story = {
//   render: (args) => {
//     const [value, setValue] = useState("grid")
    
//     return (
//       <ButtonGroup {...args} variant="secondary" value={value} onValueChange={setValue}>
//         <ButtonGroupItem value="list">List</ButtonGroupItem>
//         <ButtonGroupItem value="grid">Grid</ButtonGroupItem>
//         <ButtonGroupItem value="card">Card</ButtonGroupItem>
//       </ButtonGroup>
//     )
//   },
// }

// export const Small: Story = {
//   render: (args) => {
//     const [value, setValue] = useState("xs")
    
//     return (
//       <ButtonGroup {...args} size="sm" value={value} onValueChange={setValue}>
//         <ButtonGroupItem value="xs">XS</ButtonGroupItem>
//         <ButtonGroupItem value="sm">SM</ButtonGroupItem>
//         <ButtonGroupItem value="md">MD</ButtonGroupItem>
//         <ButtonGroupItem value="lg">LG</ButtonGroupItem>
//       </ButtonGroup>
//     )
//   },
// }

// export const Large: Story = {
//   render: (args) => {
//     const [value, setValue] = useState("week")
    
//     return (
//       <ButtonGroup {...args} size="lg" value={value} onValueChange={setValue}>
//         <ButtonGroupItem value="day">Day</ButtonGroupItem>
//         <ButtonGroupItem value="week">Week</ButtonGroupItem>
//         <ButtonGroupItem value="month">Month</ButtonGroupItem>
//       </ButtonGroup>
//     )
//   },
// }

// export const WithIcons: Story = {
//   render: (args) => {
//     const [value, setValue] = useState("home")
    
//     return (
//       <ButtonGroup {...args} value={value} onValueChange={setValue}>
//         <ButtonGroupItem value="home">🏠 Home</ButtonGroupItem>
//         <ButtonGroupItem value="profile">👤 Profile</ButtonGroupItem>
//         <ButtonGroupItem value="settings">⚙️ Settings</ButtonGroupItem>
//       </ButtonGroup>
//     )
//   },
// }

// export const NoSelection: Story = {
//   render: (args) => {
//     const [value, setValue] = useState("")
    
//     return (
//       <ButtonGroup {...args} value={value} onValueChange={setValue}>
//         <ButtonGroupItem value="option1">Option 1</ButtonGroupItem>
//         <ButtonGroupItem value="option2">Option 2</ButtonGroupItem>
//         <ButtonGroupItem value="option3">Option 3</ButtonGroupItem>
//       </ButtonGroup>
//     )
//   },
// }