# CLAUDE.md - Frontend UI Design & Development

This folder is for UI designers to vibe code and design components with TypeScript and React.

## Project Purpose

This is the frontend React application for rapid UI component development and design prototyping. The focus is on creating reusable components and integrating them into cohesive demos.

## File Structure & Conventions

### Component Development
- **New components**: Create in `src/components/` directory
- **Component + Storybook**: Both the component and its Storybook story should be created together
- **Demo pages**: Integration demos should be placed in `app/routes/home.tsx`

### TypeScript Requirements
- All code must use TypeScript
- Prefer named imports over default imports (enforced by ESLint)
- Use absolute imports with `@` prefix instead of relative imports (`../`)

## ESLint Configuration

The project follows strict ESLint rules from the root `configs/eslint/` directory:

### Key Rules Enforced
- **No relative imports**: Use `@/` for absolute imports instead of `../`
- **Named imports only**: `import { useState } from 'react'` not `import React from 'react'`
- **TypeScript ESLint**: Full TypeScript linting with naming conventions
- **React Rules**: React hooks, React Compiler compatibility
- **Tailwind CSS**: Better Tailwind class ordering and validation
- **Prettier**: Code formatting integration
- **Import ordering**: Structured import organization
- **Comment length**: Enforced comment length limits
- **Unicorn rules**: Modern JavaScript patterns
- **Storybook**: Storybook-specific linting rules

### Ignored Directories
- `src/components/shadcn-ui/**` - shadcn/ui components remain untouched
- `src/apis/**/*.d.ts` - Generated API type definitions

## Development Macros

Use these production-safe macros instead of `console.*`, `debugger`, or `assert`:

### Environment Checks
```typescript
IS_DEV    // boolean - development environment
IS_PROD   // boolean - production environment  
IS_TEST   // boolean - test environment
```

### Logging (with namespaced colors)
```typescript
const logger = MAKE_LOGGER('ComponentName')
DEBUG(logger, 'Debug message', data)
LOG(logger, 'Log message', data)
INFO(logger, 'Info message', data)
WARN(logger, 'Warning message', data)
ERROR(logger, 'Error message', data)
```

### Timing
```typescript
TIME(logger, 'operation-name')
TIME_LOG(logger, 'progress update')
TIME_END(logger)
```

### Assertions & Type Narrowing
```typescript
ASSERT(condition, 'Assertion message')
ASSERT_EXPRESSION(expression, 'Expression should not be null')
FAIL('Explicit failure message')
NOT_IMPLEMENTED()
UNREACHABLE(value, 'This case should never happen')
```

### Debugging
```typescript
DEBUGGER('Pause execution here')
DEBUGGER_IF_NOT(condition, 'Debug if condition fails')
```

**Important**: These macros are automatically removed in production builds by Rsbuild. They provide type safety and better development experience compared to native alternatives.

## Component Development Workflow

1. **Create Component**: `src/components/my-component.tsx`
2. **Create Storybook**: `src/components/my-component.stories.tsx`
3. **Follow existing patterns**: Look at `button-group.tsx` and `button-group.stories.tsx` as examples
4. **Use Storybook conventions**: 
   - Meta configuration with controls
   - Multiple story variants
   - Interactive examples with state

## Integration & Demo Development

- **Demo pages**: Use `app/routes/home.tsx` for showcasing component integrations
- **Available components**: Full shadcn/ui component library in `src/components/shadcn-ui/`
- **Styling**: TailwindCSS with better class name validation

## Commands

Run from this directory:
```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm lint         # Run ESLint
pnpm lint:fix     # Fix ESLint issues
pnpm typecheck    # TypeScript type checking
pnpm sb           # Start Storybook
pnpm spellcheck   # Spell checking
```

## Important Notes

- **No comments in code** unless explicitly requested
- **No Chinese characters** allowed in code
- **No abbreviations** - all words must pass spell checker
- Use **2-space indentation** consistently
- Leverage the macro system for better debugging and development experience
- Always create both component and Storybook story together