
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { FaCheckCircle, FaRegClock,} from "react-icons/fa"

interface Order {
  id: string
  external_id: string
  datetime: string
  url: string
  order_status: string
  payment_methods: Array<{
    external_id: string
    type: string
    brand: string
    last_four: string
    name: string
    transaction_amount: string
  }>
  price: {
    sub_total: string
    adjustments: Array<{
      type: string
      label: string
      amount: string
    }>
    total: string
    currency: string
  }
  products: Array<{
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
  }>
}

interface StatsCardsProps {
  filteredOrders: Order[]
}

export default function StatCard({ filteredOrders }: StatsCardsProps){

    return(
      <>
      <h2 className="mb-2 font-medium text-black">Totals:</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          
              <Card className="">
                <CardHeader className="space-y-0 pb-2">
                  <CardTitle className="flex flex-no-wrap text-base border-b border-black font-medium text-black pb-1">Total Orders: </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl md:text-3xl font-medium">{filteredOrders.length}</div>
                </CardContent>
              </Card>

              <Card className="">
                <CardHeader className="space-y-0 pb-2">
                  <CardTitle className="flex flex-no-wrap text-base border-b border-black font-medium text-black pb-1">
                    <Badge className="bg-yellow-100 text-yellow-800 px-1 py-1">
                        <div className="flex items-center">
                        <span><FaRegClock /></span>
                        </div>
                    </Badge> Revinue</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl md:text-3xl font-medium">
                    ${filteredOrders
                    .filter((order) => order.order_status === "PENDING" || order.order_status === "PROCESSING")
                    .reduce((sum, order) => sum + Number.parseFloat(order.price.total), 0)
                    .toFixed(2)}
                  </div>
                </CardContent>
              </Card>

              <Card className="">
                <CardHeader className="space-y-0 pb-2">
                  <CardTitle className="flex flex-no-wrap text-base border-b border-black font-medium text-black pb-1">
                    <Badge className="bg-green-100 text-green-800 px-1 py-1">
                        <div className="flex items-center">
                        <span><FaCheckCircle/> </span>
                        </div>
                    </Badge> Revenue</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl md:text-3xl font-medium" >
                   ${filteredOrders
                    .filter((order) => order.order_status === "COMPLETED")
                    .reduce((sum, order) => sum + Number.parseFloat(order.price.total), 0)
                    .toFixed(2)}
                  </div>
                </CardContent>
              </Card>

              <Card className="">
                <CardHeader className="space-y-0 pb-2">
                  <CardTitle className="text-base flex flex-no-wrap border-b border-black font-medium text-black pb-1">Total Revenue</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl md:text-3xl font-medium" >
                    ${filteredOrders.reduce((sum, order) => sum + Number.parseFloat(order.price.total), 0).toFixed(2)}
                  </div>
                </CardContent>
              </Card>

            </div>
            </>
    )
}