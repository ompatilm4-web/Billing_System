from Core.Database import db


# ======================
# Products Table
# ======================

class Product(db.Model):
    __tablename__ = "products"

    id = db.Column(db.Integer, primary_key=True)

    product_name = db.Column(
        db.String(200),
        nullable=False
    )

    price = db.Column(
        db.Numeric(10, 2),
        nullable=False
    )

    stock_quantity = db.Column(
        db.Integer,
        default=0
    )

    def __repr__(self):
        return f"<Product {self.product_name}>"


# ======================
# Bills Table
# ======================

class Bill(db.Model):
    __tablename__ = "bills"

    id = db.Column(
        db.Integer,
        primary_key=True
    )

    customer_name = db.Column(
        db.String(100)
    )

    total_amount = db.Column(
        db.Numeric(10, 2),
        nullable=False
    )

    payment_method = db.Column(
        db.String(20)
    )

    bill_date = db.Column(
        db.DateTime,
        server_default=db.func.now()
    )

    def __repr__(self):
        return f"<Bill {self.id}>"


# ======================
# Bill Items Table
# ======================

class BillItem(db.Model):
    __tablename__ = "bill_items"

    id = db.Column(
        db.Integer,
        primary_key=True
    )

    bill_id = db.Column(
        db.Integer,
        db.ForeignKey("bills.id"),
        nullable=False
    )

    product_id = db.Column(
        db.Integer,
        db.ForeignKey("products.id"),
        nullable=False
    )

    quantity = db.Column(
        db.Integer,
        nullable=False
    )

    unit_price = db.Column(
        db.Numeric(10, 2),
        nullable=False
    )

    line_total = db.Column(
        db.Numeric(10, 2),
        nullable=False
    )

    bill = db.relationship(
        "Bill",
        backref="items"
    )

    product = db.relationship(
        "Product"
    )

    def __repr__(self):
        return f"<BillItem {self.id}>"