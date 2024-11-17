module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset', // Vue CLI 的标准预设
  ],
  plugins: [
    // 如果需要兼容展开语法（...），可以添加此插件
    '@babel/plugin-proposal-object-rest-spread',
  ],
};
