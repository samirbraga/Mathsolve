app.controller("mathsolveCtrl", function ($scope, $http) {
  $scope.icons = [
    {src: "matrix.png", name: "Matriz", href: "/matriz", color: "#26645c"},
    {src: "consts.png", name: "Contantes", href: "/contantes", color: "#3a8b83"},
    {src: "log.png", name: "Logaritmo", href: "/logaritmo", color: "#1d9989"},
    {src: "2equation.png", name: "Equação do 2º grau", href: "/equacao2", color: "#116f72"},
    {src: "1equation.png", name: "Equação do 1º grau", href: "/equacao1", color: "#0e7a72"},
    {src: "convert.png", name: "Conversão", href: "/conversao", color: "#0a7e74"},
    {src: "geometry.png", name: "Geometria", href: "/geometria", color: "#16857d"},
    {src: "percent.png", name: "Porcentagem", href: "/porcentagem", color: "#16857d"},
    {src: "progress.png", name: "Progressões", href: "/progress", color: "#1c998d"},
    {src: "pow.png", name: "Exponenciação", href: "/exponenciacao", color: "#15857d"},
    {src: "radic.png", name: "Radiciação", href: "/radiciacao", color: "#06665e"},
  ]
})