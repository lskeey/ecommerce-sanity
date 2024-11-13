import { COUPON_CODES } from "@/sanity/lib/sales/couponCode";
import { getActiveSaleByCouponCode } from "@/sanity/lib/sales/getActiveSaleByCouponCode";

const BlackFridayBanner = async () => {
  const sale = await getActiveSaleByCouponCode(COUPON_CODES.BFRIDAY);

  if (!sale?.isActive) {
    return null;
  }

  return (
    <div className="px-4 py-6 space-y-2 border shadow-md rounded-md bg-gradient-to-r from-sky-500 to-emerald-500">
      <div className="font-bold text-xl text-white">{sale?.title}</div>
      <div className="text-white font-semibold">{sale?.description}</div>
      <div className="px-4 py-2 bg-white inline-block rounded-full text-sm">
        Use code: <span className="font-bold">{sale?.couponCode}</span> for <span className="font-bold">{sale?.discountAmount}%</span> off
      </div>
    </div>
  )
}

export default BlackFridayBanner