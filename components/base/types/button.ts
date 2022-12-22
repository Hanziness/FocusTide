export enum ButtonTheme {
  /// Use primary theme colours
  Primary = "primary",

  /// Use secondary theme colours
  Secondary = "secondary",

  /// Use neutral theme colours
  Neutral = "neutral",

  /// Use neutral theme colours, but force dark variant
  NeutralDark = "neutraldark",

  /// Use neutral theme colours, but force light variant
  NeutralWhite = "neutralwhite",
}

/// Defines in which directions the button scales when clicked
export enum MotionTheme {
  None = "none",
  Horizontal = "horizontal",
  All = "all",
}

/// Defines the fill style of the button
export enum ButtonImportance {
  Filled = "filled",
  Tonal = "tonal",
  Outline = "outline",
  Text = "text",
}
