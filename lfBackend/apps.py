from django.apps import AppConfig


class LfbackendConfig(AppConfig):
    name = 'lfBackend'

    def ready(self):
    	from . import signals