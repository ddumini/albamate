export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [0], // type-enum 규칙 비활성화
    'type-case': [0], // type-case 규칙 비활성화
    'type-empty': [0], // type-empty 규칙 비활성화
    'scope-case': [2, 'always', 'lower-case'],
    'subject-empty': [0], // subject-empty 규칙 비활성화
    'subject-full-stop': [2, 'never', '.'],
    'header-max-length': [2, 'always', 72],
  },
};
