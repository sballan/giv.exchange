
# Governance, Investment, and Voting Exchange

## Overview
The GIV Exchange allows users to wield the power of a shared treasury in proportion to the amount of money they are willing to stake.

Users can create a `gwToken` counterpart to a token they wish to use in the GIV Exchange. `gTokens` are named by prepending the letters "gw" to the beginning of the name of the token.  For instance, the `gwToken` counterpart of `WETH` would be `gwWETH`, pronounced "GIV wrapped WETH".  In this article, we'll refer to the counterpart to a `gwToken` as an "asset token."

The GIV Exchange has a native token called `GIV`, pronounced "give".  These tokens are mined every time the GIV Exchange's investment portfolio is contributed to, in proportion to the percentage of growth the pool has seen through contribution (as opposed to the value of the tokens rising).

> NOTE: Would be amazing to have the incentives to create a pool mirror the incentives of contributing to one.

## User Stories
### Creating a new `gwToken`
To create a new `gwToken`, a user must create a new treasury.  The treasury will require:
1. A number of asset tokens for the reserve.  The number of minted `gwToken`s cannot exceed the number of asset tokens in the reserve.
2. A number of asset tokens for the liquidity pool.
3. A number of `gwToken`s for the liquidity pool.
4. A number of GIV tokens for the liquidity pool.

#### Easy Start
An easy way to kick this off would be to simply deposit some number of asset tokens.  These asset tokens would all go to the reserve, with an equal number of new `gwToken`s minted and placed in the liquidity pool.  An initial contribution of GIV tokens could be placed in the liquidity pool as well, minted for this purpose (it could be a very small number).

The GIV Exchange would now be able to sell `gwToken`s from the liquidity pool, but could not buy them.  The first user to buy the tokens would receive a price of 1:1, and would be prohibited from buying more than half the tokens.  After the first purchase, the price would be set by the proportion of tokens.

The price of the asset and `gwToken`s in terms of GIV would initially be way off - only a little GIV would be placed in the pool, so the GIV would be very expensive.  Users with some GIV would be wise to use it to buy asset tokens or `gwToken`s from the pool since they would get a great price.  The liquidity pool therefore has a growing number of GIV tokens, until the price flattens.

## Implementation
### Investment Portfolio
Anytime the protocol is able to set aside money, asset tokens are contributed to the Investment Portfolio.  Contributed tokens are sold on exchanges, and used to buy tokens in proportion to the investment strategy determined through governance.


### `gwToken` Treasuries
A treasury of `gwTokens` is comprised of the following:
1. A liquidity pool of `gwTokens` and asset tokens.
3. A reserve of asset tokens, which match at least 1:1 the number of minted gwTokens.

#### `gwToken` Liquidity Pools
A liquidity pool holds the tokens that are made available to for swapping.  For instance, a pool might be created with 10 WETH tokens and 10 gwWETH tokens.  When a user wants to exchange WETH for gwWETH (or vice versa), they swap the token they have for its counterpart.

The exchange rate of a liquidity pool is determined by the ratio of tokens in the pool. For instance, if there are 20 WETH tokens and 10 gwWETH tokens, the exchange rate will be approximately 2:1 gwWETH to WETH.

#### `gwToken` Reserve
The reserve holds all the asset tokens that back all existing `gwToken`s in this treasury.  There is always at least 1 asset token for every minted `gwToken`.

On occasion, we can burn `gwToken`.  When this happens, we know that we can safely remove an asset token from the reserve without losing our backing, and deposit it in the Investment Portfolio.  The Reserve should always hold as close to a 1:1 ratio as possible.

### GIV Liquidity Pools
Each `gwToken` has a GIV liquidity pool.  This liquidity pool contains some number of `gwTokens`, and some number of GIV tokens.  When GIV tokens are mined, they are contributed to the liquidity pools, *in equal amounts*.  This incentivizes those liquidity pools to have a number of `gwTokens` that corresponds to the market value of the amount of GIV that is donated typically.  This means that if a `gwToken` rises in price sharply, there will be more `gwToken`s in that pool than the market expects, in other words they would be below market price, if you pay with GIV.  Arbitrageurs are trusted to do this work.  We may also allow users to stake GIV in pools for this reason, so they can be used as "bots".

Because there is a GIV liquidity pool for every `gwToken`, we have a built in method for providing liquidity between `gwToken`s, through GIV trades.  Opportunities abound for burning GIV tokens, which we may do each time there is a transaction.

Because we have liquidity between `gwTokens`, we also have liquidity between all asset tokens.  We are an Exchange, after all.

We can provide all transactions at cost - or in some cases, we could even subsidize them.

#### Speculation
What would this liquidity look like?  Well, at first - there would be lots of price movements.  We wouldn't have very much liquidity at first.  But because of our funny economy that relies on the GIV token, the sharp price movements will also happen for the GIV token pools.  In some cases, this will mean that some asset token is made available for a very cheap price in terms of GIV tokens.  Some other asset will be very expensive in terms of GIV tokens.  There will be an opportunity therefore to trade those tokens for each other to make a profit.  Each time there is a price movement, there is a profit making opportunity for someone else - namely the Exchange itself (and any stakers get a cut).

