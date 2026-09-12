@echo off
chcp 65001 >nul
set PATH=C:\Users\Cynthia\AppData\Local\Programs\MinGit\cmd;%PATH%
cd /d "C:\Users\Cynthia\OneDrive\Área de Trabalho\Projeto site alergia"
echo ====================================================================
echo  ENVIANDO PROJETO PARA O GITHUB
echo  Repositório: https://github.com/mafracynthia-dotcom/site-imunologia.git
echo ====================================================================
echo.
git push -u origin main
echo.
if %ERRORLEVEL% equ 0 (
    echo ====================================================================
    echo  [SUCESSO] Todos os arquivos foram enviados para o GitHub!
    echo ====================================================================
) else (
    echo ====================================================================
    echo  [AUTENTICAÇÃO NECESSÁRIA NO GITHUB]
    echo.
    echo  Se o GitHub solicitou suas credenciais:
    echo  1. Usuário: mafracynthia-dotcom
    echo  2. Senha: Use um Personal Access Token (Token de Acesso) gerado
    echo     no GitHub (em Settings > Developer Settings > Personal Access Tokens).
    echo ====================================================================
)
pause
