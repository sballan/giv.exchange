import './style.css'

const app = document.querySelector<HTMLDivElement>('#app')!

app.innerHTML = `
<h1>Governance, Investment, and Voting Exchange</h1>

<h2>Overview</h2>

<p>The GIV Exchange allows users to wield the power of a shared treasury in proportion to the amount of money they are willing to stake.</p>

<p>Users can create a <code>gwToken</code> counterpart to a token they wish to use in the GIV Exchange. <code>gTokens</code> are named by prepending the letters &quot;gw&quot; to the beginning of the name of the token. For instance, the <code>gwToken</code> counterpart of <code>WETH</code> would be <code>gwWETH</code>, pronounced &quot;GIV wrapped WETH&quot;. In this article, we'll refer to the counterpart to a <code>gwToken</code> as an &quot;asset token.&quot;</p>

<p>The GIV Exchange has a native token called <code>GIV</code>, pronounced &quot;give&quot;. These tokens are mined every time the GIV Exchange's investment portfolio is contributed to, in proportion to the percentage of growth the pool has seen through contribution (as opposed to the value of the tokens rising).</p>

<blockquote>
<p>NOTE: Would be amazing to have the incentives to create a pool mirror the incentives of contributing to one. </p>
</blockquote>

<h2>Implementation</h2>

<h3>Investment Portfolio</h3>

<p>Anytime the protocol is able to set aside money, asset tokens are contributed to the Investment Portfolio. Contributed tokens are sold on exchanges, and used to buy tokens in proportion to the investment strategy determined through governance.</p>

<h3><code>gwToken</code> Treasuries</h3>

<p>A treasury of <code>gwTokens</code> is comprised of the following:</p>

<ol>
<li>A liquidity pool of <code>gwTokens</code> and asset tokens.</li>
<li>A reserve of asset tokens, which match at least 1:1 the number of minted gwTokens.</li>
</ol>

<h4><code>gwToken</code> Liquidity Pools</h4>

<p>A liquidity pool holds the tokens that are made available to for swapping. For instance, a pool might be created with 10 WETH tokens and 10 gwWETH tokens. When a user wants to exchange WETH for gwWETH (or vice versa), they swap the token they have for its counterpart.</p>

<p>The exchange rate of a liquidity pool is determined by the ratio of tokens in the pool. For instance, if there are 20 WETH tokens and 10 gwWETH tokens, the exchange rate will be approximately 2:1 gwWETH to WETH.</p>

<h4><code>gwToken</code> Reserve</h4>

<p>The reserve holds all the asset tokens that back all existing <code>gwToken</code>s in this treasury. There is always at least 1 asset token for every minted <code>gwToken</code>.</p>

<p>On occasion, we can burn <code>gwToken</code>. When this happens, we know that we can safely remove an asset token from the reserve without losing our backing, and deposit it in the Investment Portfolio. The Reserve should always hold as close to a 1:1 ratio as possible.</p>

<h3>GIV Liquidity Pools</h3>

<p>Each <code>gwToken</code> has a GIV liquidity pool. This liquidity pool contains some number of <code>gwTokens</code>, and some number of GIV tokens. When GIV tokens are mined, they are contributed to the liquidity pools, <em>in equal amounts</em>. This incentivizes those liquidity pools to have a number of <code>gwTokens</code> that corresponds to the market value of the amount of GIV that is donated typically. This means that if a <code>gwToken</code> rises in price sharply, there will be more <code>gwToken</code>s in that pool than the market expects, in other words they would be below market price, if you pay with GIV. Arbitrageurs are trusted to do this work. We may also allow users to stake GIV in pools for this reason, so they can be used as &quot;bots&quot;.</p>

<p>Because there is a GIV liquidity pool for every <code>gwToken</code>, we have a built in method for providing liquidity between <code>gwToken</code>s, through GIV trades. Opportunities abound for burning GIV tokens, which we may do each time there is a transaction.</p>

<p>Because we have liquidity between <code>gwTokens</code>, we also have liquidity between all asset tokens. We are an Exchange, after all.</p>

<p>We can provide all transactions at cost - or in some cases, we could even subsidize them. </p>

<h4>Speculation</h4>

<p>What would this liquidity look like? Well, at first - there would be lots of price movements. We wouldn't have very much liquidity at first. But because of our funny economy that relies on the GIV token, the sharp price movements will also happen for the GIV token pools. In some cases, this will mean that some asset token is made available for a very cheap price in terms of GIV tokens. Some other asset will be very expensive in terms of GIV tokens. There will be an opportunity therefore to trade those tokens for each other to make a profit. Each time there is a price movement, there is a profit making opportunity for someone else - namely the Exchange itself (and any stakers get a cut).</p>


<br>
<br>
<i>Copyright 2021 Samuel Ballan</i>
`
