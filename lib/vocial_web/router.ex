defmodule VocialWeb.Router do
  use VocialWeb, :router

  pipeline :browser do
    plug(:accepts, ["html"])
    plug(:fetch_session)
    plug(:fetch_flash)
    plug(:protect_from_forgery)
    plug(:put_secure_browser_headers)
  end

  pipeline :api do
    plug(:accepts, ["json"])
  end

  scope "/", VocialWeb do
    # Use the default browser stack
    pipe_through(:browser)

    get("/", PageController, :index)

    resources("/sessions", SessionController, only: [:create])
    get("/login", SessionController, :new)
    delete("/logout", SessionController, :delete)

    resources("/polls", PollController, only: [:index, :new, :create, :show])
    resources("/users", UserController, only: [:new, :show, :create])

    get("/options/:id/vote", PollController, :vote)

    get("/history", PageController, :history)
  end

  # Other scopes may use custom stacks.
  # scope "/api", VocialWeb do
  #   pipe_through :api
  # end
end
