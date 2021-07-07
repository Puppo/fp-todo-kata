## Setup project

Run the scripts

```bash
./setup.sh
./start.sh
```

## Bash alias

We suggest to add the following alias to your `~/.bashrc` or `~/.zshrc`.

```bash
alias todo_be="docker exec -ti todo_dev_be zsh"
alias todo_fe="docker exec -ti todo_dev_fe zsh"
alias todo_api="docker exec -ti todo_dev_be yarn start todo-api"
alias todo_app="docker exec -ti todo_dev_fe yarn start todo-app"
```
