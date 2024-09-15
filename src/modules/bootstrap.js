import brandRoutes from "./brand/brand.routes.js"
import categoryRoutes from "./category/category.routes.js"
import productRoutes from "./product/product.routes.js"
import subCategoryRoutes from "./subcategory/subcategory.routes.js"
import userRoutes from "./user/user.routes.js"
import authRouter from "./auth/auth.routes.js"
import reviewRoutes from "./review/review.routes.js"
import wishlistRoutes from "./wishlist/wishlist.routes.js"
import addressRoutes from "./address/address.routes.js"
import couponRoutes from "./coupon/coupon.routes.js"
import cartRouter from "./cart/cart.routes.js"
import orderRouter from "./order/order.routes.js"


export const bootstrap = (app) =>{
app.use('/api/categories', categoryRoutes)
app.use('/api/subcategories', subCategoryRoutes)
app.use('/api/brands', brandRoutes)
app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/auth/', authRouter)
app.use('/api/reviews/', reviewRoutes)
app.use('/api/wishlists/', wishlistRoutes)
app.use('/api/addresses/', addressRoutes)
app.use('/api/coupons/', couponRoutes)
app.use('/api/carts/', cartRouter)
app.use('/api/orders/', orderRouter)
}