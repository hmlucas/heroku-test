from app.extensions import db

class Options(db.Model):
    __tablename__ = 'options'
    option = db.Column(db.String(64), primary_key=True, nullable=False)
    additional_charge = db.Column(db.Float, nullable=False)
    category = db.Column(db.String(32), nullable=False)
    is_seasonal = db.Column(db.Boolean, nullable=False)
    
    def __repr__(self):
        return f"<Options {self.option}>"

    def to_dict(self):
        return {
            "option": self.option,
            "additional_charge": self.additional_charge,
            "category": self.category,
            "is_seasonal": self.is_seasonal
        }