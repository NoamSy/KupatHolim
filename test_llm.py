import asyncio
from langchain_openai import ChatOpenAI
from browser_use import Agent

async def main():
    llm = ChatOpenAI(
        base_url="https://openrouter.ai/api/v1",
        api_key="dummy",
        model="openai/gpt-4o"
    )
    # Don't set provider manually
    agent = Agent(task="Go to example.com", llm=llm)
    await agent.run()

asyncio.run(main())
