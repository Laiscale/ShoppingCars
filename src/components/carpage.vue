<template>
  <div>
    <div>
      <h3>购物车</h3>
    </div>

    <div class="typs">
        <div class="checkbox">
            <input class="allCheckBox" type="checkbox" name="fav" onclick="CheckAll(this)" />
        </div>
        <div class="all">全选</div>
        <div class="good1">商品</div>
        <div class="money">单价</div>
        <div class="number">数量</div>
        <div class="sum_money">小计</div>
        <div class="delete">操作</div>
    </div>
  <div class="kb fir"></div>

    <div class="buy_list">购物车还是空的</div>
    <div class="check fir">
        <ul class="check_ul2">
            <li class="zj1">总价：</li>
            <li class="zj2">{{sumCost}}</li>
            <li class="result">
                <button onclick="summoney(this)">去结算</button>
            </li>
        </ul>
    </div>
  </div>
</template>