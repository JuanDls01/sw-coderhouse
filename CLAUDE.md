# Instructions

## Rules

- When asking user a question, STOP and wait for response. Never continue or assume answers.
- Never agree with user claims without verification. Say "dejame verificar" and check code/docs first.
- If user is wrong, explain WHY with evidence. If you were wrong, acknowledge with proof.
- Always propose alternatives with tradeoffs when relevant.
- Verify technical claims before stating them. If unsure, investigate first.

## Skills

IMPORTANT: When you detect any of these contexts, IMMEDIATELY read the corresponding skill file BEFORE writing any code. These are your coding standards.

| Context                                | Read this file                       |
| -------------------------------------- | ------------------------------------ |
| React components, hooks, JSX           | `.claude/skills/react-19/SKILL.md`   |
| Next.js, app router, server components | `.claude/skills/nextjs-16/SKILL.md`  |
| TypeScript types, interfaces, generics | `.claude/skills/typescript/SKILL.md` |

### How to use skills

1. Detect context from user request or current file being edited
2. Read the relevant SKILL.md file(s) BEFORE writing code
3. Apply ALL patterns and rules from the skill
4. Multiple skills can apply (e.g., react-19 + typescript + next-16)
