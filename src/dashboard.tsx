import React, { useState } from "react"
import Header from "./components/header"
import Sidebar from "./components/sidebar"
import StatCard from "./components/statcard"
import Filters from "./components/filters"
import { Button } from "./components/ui/button"
import { Card, CardContent, CardDescription, CardHeader } from "./components/ui/card"
import { Badge } from "./components/ui/badge"
import ordersData from "./data/orders.json"
import { FaCheckCircle, FaRegClock, FaTruck, FaQuestion } from "react-icons/fa"
import { MdOutlineCancel } from "react-icons/md";

interface PaymentMethod {
  external_id: string
  type: string
  brand: string
  last_four: string
  name: string
  transaction_amount: string
}

interface Adjustment {
  type: string
  label: string
  amount: string
}

interface Price {
  sub_total: string
  adjustments: Adjustment[]
  total: string
  currency: string
}

interface Product {
  external_id: string
  name: string
  url: string
  quantity: number
  price: {
    sub_total: string
    total: string
    unit_price: string
  }
  eligibility: string[]
}

interface Order {
  id: string
  external_id: string
  datetime: string
  url: string
  order_status: string
  payment_methods: PaymentMethod[]
  price: Price
  products: Product[]
}

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "completed":
    case "picked_up":
    case "delivered" :
      return "bg-green-100 text-green-800"
    case "pending":
      return "bg-yellow-100 text-yellow-800"
    case "shipped":
      return "bg-blue-100 text-blue-800"
    case "refunded":
    case "cancelled":
    case "failed" :
    case "unrecognized":
      return "bg-red-100 text-red-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

const getStatusIcon = (status: string) => {
  switch(status.toLowerCase()){
    case "completed":
    case "picked_up":
    case "delivered" :
      return <FaCheckCircle className="text-green-800" />
    case "pending":
      return <FaRegClock className="text-yellow-800" />
    case "shipped":
      return <FaTruck className="text-blue-800" />
    case "refunded":
    case "cancelled":
    case "failed" :
    case "unrecognized":
      return <MdOutlineCancel className="text-red-800" />
    default:
      return <FaQuestion className="bg-gray-100 text-gray-800" />
  }
}

let root = document.documentElement;
root.addEventListener("mousemove", e => {
  root.style.setProperty('--gradient-pxX', e.clientX + "px");
  root.style.setProperty('--gradient-pxY', e.clientY + "px");
});

export default function Dashboard() {
  const [orders] = useState<Order[]>(ordersData)
  const [filteredOrders, setFilteredOrders] = useState<Order[]>(ordersData)
  const [filters, setFilters] = useState({
    dateFrom: "",
    dateTo: "",
    minPrice: "",
    maxPrice: "",
    orderStatus: "all",
    cardType: "all",
    productName: "",
  })

  const [sidebarOpen, setSidebarOpen] = useState(false)

  const applyFilters = () => {
    let filtered = [...orders]

    // Order status filter
    if (filters.orderStatus !== "all") {
      filtered = filtered.filter((order) => order.order_status === filters.orderStatus)
    }

    // Card type filter
    if (filters.cardType !== "all") {
      filtered = filtered.filter((order) => order.payment_methods.some((payment) => payment.brand === filters.cardType))
    }

    // Product name filter
    if (filters.productName) {
      filtered = filtered.filter((order) =>
        order.products.some((product) => product.name.toLowerCase().includes(filters.productName.toLowerCase())),
      )
    }

    setFilteredOrders(filtered)
  }

  const clearFilters = () => {
    setFilters({
      dateFrom: "",
      dateTo: "",
      minPrice: "",
      maxPrice: "",
      orderStatus: "all",
      cardType: "all",
      productName: "",
    })
    setFilteredOrders(orders)
  }

  const updateFilter = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  // Apply filters whenever filters change
  React.useEffect(() => {
    applyFilters()
  }, [filters, orders])

  return (
    <div className="flex h-screen" style={{background: "radial-gradient(circle at var(--gradient-pxX) var(--gradient-pxY) ,rgba(209, 255, 241, 1) 0%, rgba(255, 255, 255, 1) 33%, rgba(255, 255, 255, 1) 55%, rgba(237, 255, 235, 1) 100%)"}}>
      {/* Left Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        
      {/* Main Content */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ease-in-out ${sidebarOpen ? "ml-64" : "ml-0"}`}>
        {/* Header */}
        <Header onSidebarToggle={() => setSidebarOpen(!sidebarOpen)} />

        {/* Main Dashboard Content */}
        <main className="flex-1 p-6 overflow-auto" >
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="text-2xl font-semibold text-gray-900 mb-2">Hello Customer</h1>
            </div>

            {/* Filters Section */}
              <Filters
              filters={filters}
              onFilterChange={updateFilter}
              onClearFilters={clearFilters}
              filteredCount={filteredOrders.length}
              totalCount={orders.length}
            />

            {/* Stats Cards */}
            <StatCard filteredOrders={filteredOrders} totalOrders={orders.length} />

            {/* Orders Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <Card key={order.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-3">
                      <CardDescription className="flex items-center justify-between border-b pb-2">
                        <span>{new Date(order.datetime).toLocaleDateString()}</span>
                        <Badge className={getStatusColor(order.order_status)}>
                          <div className="flex items-center space-x-1">
                            <span>{getStatusIcon(order.order_status)}</span>
                            <span>{order.order_status}</span>
                          </div>
                        </Badge>
                      </CardDescription>
                      <div className="flex items-center ">
                        <div className="">Order #{order.external_id}</div>
                        
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* Products */}
                      <div>
                        <h4 className="font-medium text-sm text-gray-700 mb-2">Products</h4>
                        {order.products.map((product) => (
                          <div key={product.external_id}>
                          <div
                            className="flex items-center justify-between p-2 bg-gray-50 rounded"
                          >
                            <div className="flex-1">
                              <p className="font-medium text-sm">{product.name}</p>
                              <p className="text-xs text-gray-600">Qty: {product.quantity}</p>
                              
                            </div>
                            <div className="text-right">
                              <p className="font-medium">${product.price.total}</p>
                            </div>
                          </div>
                          {product.eligibility.length > 0 && (
                                <div className="flex flex-wrap gap-1 mt-1">
                                  {product.eligibility.map((eligibility) => (
                                    <Badge key={eligibility} variant="secondary" className="text-xs">
                                      {eligibility}
                                    </Badge>
                                  ))}
                                </div>
                              )}
                          </div>
                        ))}
                      </div>

                      {/* Payment Method */}
                      <div>
                        <h4 className="font-medium text-sm text-gray-700 mb-2">Payment</h4>
                        {order.payment_methods.map((payment) => (
                          <div key={payment.external_id} className="flex items-center space-x-2 p-2 bg-gray-50 rounded">
                            <span className="text-sm">
                              {payment.brand} •••• {payment.last_four}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Price Breakdown */}
                      <div className="border-t pt-3 flex-1">
                        <div className="flex justify-between text-sm">
                          <span>Subtotal:</span>
                          <span>${order.price.sub_total}</span>
                        </div>
                        {order.price.adjustments.map((adjustment, index) => (
                          <div key={index} className="flex justify-between text-sm text-gray-600">
                            <span>{adjustment.label}:</span>
                            <span>${adjustment.amount}</span>
                          </div>
                        ))}
                        <div className="flex justify-between font-semibold text-base border-t pt-2 mt-2">
                          <span>Total:</span>
                          <span>
                            ${order.price.total} {order.price.currency}
                          </span>
                        </div>
                      </div>

                      {/* View Order Link */}
                      <Button variant="outline" size="sm" className="w-full">
                        Product Link
                      </Button>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
                  <p className="text-gray-600">Try adjusting your filters to see more results.</p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

    </div>
  )
}
