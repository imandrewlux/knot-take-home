import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Button } from "./ui/button"
import { Input } from "./ui/input"

interface FiltersState {
  dateFrom: string
  dateTo: string
  minPrice: string
  maxPrice: string
  orderStatus: string
  cardType: string
  productName: string
}

interface FiltersProps {
  filters: FiltersState
  onFilterChange: (key: string, value: string) => void
  onClearFilters: () => void
  filteredCount: number
  totalCount: number
}

export default function Filters({ filters, onFilterChange, onClearFilters, filteredCount, totalCount }: FiltersProps) {
return(
    <>
 {/* Price Range Filter */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">

                  {/* Order Status Filter */}
                    <div className="w-full text-sm">
                      <div className="">
                        <Select
                          value={filters.orderStatus}
                          onValueChange={(value) => onFilterChange("orderStatus", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="All statuses" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All statuses</SelectItem>
                            <SelectItem value="COMPLETED">Completed</SelectItem>
                            <SelectItem value="PENDING">Pending</SelectItem>
                            <SelectItem value="SHIPPED">Shipped</SelectItem>
                            <SelectItem value="CANCELLED">Cancelled</SelectItem>
                            <SelectItem value="PROCESSING">Processing</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                  {/* Card Type Filter */}
                  <div className="w-full text-sm">
                      <div className="">
                        <Select value={filters.cardType} onValueChange={(value) => onFilterChange("cardType", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="All cards" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All cards</SelectItem>
                            <SelectItem value="VISA">Visa</SelectItem>
                            <SelectItem value="MASTERCARD">Mastercard</SelectItem>
                            <SelectItem value="AMEX">American Express</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                  {/* Product Name Filter */}
                  <div className="w-full text-sm">
                      <div className="">
                        <Input
                          id="productName"
                          placeholder="Search products..."
                          value={filters.productName}
                          onChange={(e) => onFilterChange("productName", e.target.value)}
                          className="w-full"
                        />
                      </div>
                    </div>
                <Button className="h-[40px] md:h-auto w-full" variant="outline" size="sm" onClick={onClearFilters}>
                  Clear Filters
                </Button>
                </div>
                </>
)}