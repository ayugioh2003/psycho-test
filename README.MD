# PSYCHO-TEST

打算玩看看 [jsPsych](https://github.com/jspsych/jsPsych)，了解心理學實驗透過網頁收數據的可能性
並且希望用上各種前端技術

## Development

```bash
pnpm start:project1
```

## Install dependency in root

`typescript` in the following commands is just a example for dependency.

```bash
pnpm add -w typescript // Dependency
pnpm add -w -D typescript // devDependency
```

## Install dependency in specific package

```bash
pnpm add --filter "@psycho-test/{package}" typescript // Dependency
pnpm add --filter "@psycho-test/{package}" -D typescript // DevDependency
```
