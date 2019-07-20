defmodule VocialWeb.ChatChannel do
  use VocialWeb, :channel

  def join("chat:lobby", _payload, socket) do
    {:ok, socket}
  end
end
