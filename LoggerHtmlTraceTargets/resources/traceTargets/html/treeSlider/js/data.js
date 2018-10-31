var suiteName = "unknown suite";
var isReportFinished = true;
var items = {
    "tocom": {
        "date": 1468500385924,
        "data": [],
        "toigt": {
            "date": 1468500385924,
            "data": [],
            "caption": "igt",
            "toautotesting": {
                "date": 1468500385924,
                "data": [],
                "tologger": {
                    "date": 1468500385924,
                    "data": [],
                    "totraceTargets": {
                        "date": 1468500385924,
                        "data": [],
                        "toreports": {
                            "date": 1468500385924,
                            "tocomposer": {
                                "date": 1468500385924,
                                "data": [],
                                "toactions": {
                                    "date": 1468500385924,
                                    "data": [],
                                    "caption": "actions",
                                    "toitemAdder": {
                                        "date": 1468500385924,
                                        "data": [],
                                        "caption": "itemAdder",
                                        "toTreeSliderReportItemAdder": {
                                            "date": 1468500385924,
                                            "data": [],
                                            "toEndLogger": {
                                                "date": 1468500385945,
                                                "data": [],
                                                "tosome_text": {
                                                    "date": 1468500385945,
                                                    "data": [],
                                                    "caption": "some text"
                                                },
                                                "caption": "End Logger"
                                            },
                                            "caption": "TreeSliderReportItemAdder",
                                            "toStartLogger": {
                                                "date": 1468500385924,
                                                "data": [],
                                                "tosome_text": {
                                                    "date": 1468500385924,
                                                    "executionTime": 8,
                                                    "data": [{
                                                        "date": 1468500385939,
                                                        "caption": "Start  logger",
                                                        "description": ["some text", "\n\tat com.loka.autotesting.logger.traceTargets.reports.composer.actions.itemAdder.TreeSliderReportItemAdder.addReportItem(TreeSliderReportItemAdder.java:59)\n\tat com.loka.autotesting.logger.traceTargets.reports.composer.ReportComposer.addReportItem(ReportComposer.java:62)\n\tat com.loka.autotesting.logger.traceTargets.LoggerTraceTargetWithReport.log(LoggerTraceTargetWithReport.java:43)\n\tat com.loka.autotesting.logger.Logger.log(Logger.java:78)"],
                                                        "type": "debug"
                                                    }, {
                                                        "date": 1468500385942,
                                                        "caption": "LOG",
                                                        "description": ["log", "/*Logger.addTraceTarget(new LoggerTraceTargetWithReport(\n\t\t\t\t\t\tnew SliderReportComposerBuilder().\n\t\t\t\t\t\t\t\twithOpeningReportAfterDestroy(true).\n\t\t\t\t\t\t\t\tbuild()\n\t\t\t\t)\n\t\t);*/"],
                                                        "type": "log"
                                                    }, {
                                                        "date": 1468500385943,
                                                        "caption": "PROGRESS",
                                                        "description": ["progress", "/*Logger.addTraceTarget(new LoggerTraceTargetWithReport(\n\t\t\t\t\t\tnew SliderReportComposerBuilder().\n\t\t\t\t\t\t\t\twithOpeningReportAfterDestroy(true).\n\t\t\t\t\t\t\t\tbuild()\n\t\t\t\t)\n\t\t);*/"],
                                                        "type": "progress"
                                                    }, {
                                                        "date": 1468500385943,
                                                        "caption": "LOG  USE  SS",
                                                        "description": ["log", "/*Logger.addTraceTarget(new LoggerTraceTargetWithReport(\n\t\t\t\t\t\tnew SliderReportComposerBuilder().\n\t\t\t\t\t\t\t\twithOpeningReportAfterDestroy(true).\n\t\t\t\t\t\t\t\tbuild()\n\t\t\t\t)\n\t\t);*/"],
                                                        "type": "log"
                                                    }, {
                                                        "date": 1468500385943,
                                                        "caption": "WARNING  USE  SS",
                                                        "description": ["warning", "/*Logger.addTraceTarget(new LoggerTraceTargetWithReport(\n\t\t\t\t\t\tnew SliderReportComposerBuilder().\n\t\t\t\t\t\t\t\twithOpeningReportAfterDestroy(true).\n\t\t\t\t\t\t\t\tbuild()\n\t\t\t\t)\n\t\t);*/"],
                                                        "type": "warning"
                                                    }, {
                                                        "date": 1468500385943,
                                                        "caption": "WARNING",
                                                        "description": ["warning", "/*Logger.addTraceTarget(new LoggerTraceTargetWithReport(\n\t\t\t\t\t\tnew SliderReportComposerBuilder().\n\t\t\t\t\t\t\t\twithOpeningReportAfterDestroy(true).\n\t\t\t\t\t\t\t\tbuild()\n\t\t\t\t)\n\t\t);*/"],
                                                        "type": "warning"
                                                    }, {
                                                        "date": 1468500385943,
                                                        "caption": "STRONG  WARNING",
                                                        "description": ["strong_warning", "/*Logger.addTraceTarget(new LoggerTraceTargetWithReport(\n\t\t\t\t\t\tnew SliderReportComposerBuilder().\n\t\t\t\t\t\t\t\twithOpeningReportAfterDestroy(true).\n\t\t\t\t\t\t\t\tbuild()\n\t\t\t\t)\n\t\t);*/"],
                                                        "type": "strong_warning"
                                                    }, {
                                                        "date": 1468500385943,
                                                        "caption": "DEBUG",
                                                        "description": ["debug", "/*Logger.addTraceTarget(new LoggerTraceTargetWithReport(\n\t\t\t\t\t\tnew SliderReportComposerBuilder().\n\t\t\t\t\t\t\t\twithOpeningReportAfterDestroy(true).\n\t\t\t\t\t\t\t\tbuild()\n\t\t\t\t)\n\t\t);*/", "\n\tat com.loka.autotesting.logger.traceTargets.reports.composer.actions.itemAdder.TreeSliderReportItemAdder.addReportItem(TreeSliderReportItemAdder.java:59)\n\tat com.loka.autotesting.logger.traceTargets.reports.composer.ReportComposer.addReportItem(ReportComposer.java:62)\n\tat com.loka.autotesting.logger.traceTargets.LoggerTraceTargetWithReport.log(LoggerTraceTargetWithReport.java:43)\n\tat com.loka.autotesting.logger.Logger.log(Logger.java:78)"],
                                                        "type": "debug"
                                                    }, {
                                                        "date": 1468500385944,
                                                        "caption": "INFO",
                                                        "description": ["info", "/*Logger.addTraceTarget(new LoggerTraceTargetWithReport(\n\t\t\t\t\t\tnew SliderReportComposerBuilder().\n\t\t\t\t\t\t\t\twithOpeningReportAfterDestroy(true).\n\t\t\t\t\t\t\t\tbuild()\n\t\t\t\t)\n\t\t);*/"],
                                                        "type": "info"
                                                    }, {
                                                        "date": 1468500385944,
                                                        "caption": "EMPTY",
                                                        "description": ["", "/*Logger.addTraceTarget(new LoggerTraceTargetWithReport(\n\t\t\t\t\t\tnew SliderReportComposerBuilder().\n\t\t\t\t\t\t\t\twithOpeningReportAfterDestroy(true).\n\t\t\t\t\t\t\t\tbuild()\n\t\t\t\t)\n\t\t);*/"],
                                                        "type": ""
                                                    }, {
                                                        "date": 1468500385944,
                                                        "caption": "BLINK",
                                                        "description": ["blink", "/*Logger.addTraceTarget(new LoggerTraceTargetWithReport(\n\t\t\t\t\t\tnew SliderReportComposerBuilder().\n\t\t\t\t\t\t\t\twithOpeningReportAfterDestroy(true).\n\t\t\t\t\t\t\t\tbuild()\n\t\t\t\t)\n\t\t);*/"],
                                                        "type": "blink"
                                                    }, {
                                                        "date": 1468500385944,
                                                        "caption": "CUSTOM 1",
                                                        "description": ["custom_1", "/*Logger.addTraceTarget(new LoggerTraceTargetWithReport(\n\t\t\t\t\t\tnew SliderReportComposerBuilder().\n\t\t\t\t\t\t\t\twithOpeningReportAfterDestroy(true).\n\t\t\t\t\t\t\t\tbuild()\n\t\t\t\t)\n\t\t);*/"],
                                                        "type": "custom_1"
                                                    }, {
                                                        "date": 1468500385944,
                                                        "caption": "CUSTOM 2",
                                                        "description": ["custom_2", "/*Logger.addTraceTarget(new LoggerTraceTargetWithReport(\n\t\t\t\t\t\tnew SliderReportComposerBuilder().\n\t\t\t\t\t\t\t\twithOpeningReportAfterDestroy(true).\n\t\t\t\t\t\t\t\tbuild()\n\t\t\t\t)\n\t\t);*/"],
                                                        "type": "custom_2"
                                                    }, {
                                                        "date": 1468500385944,
                                                        "caption": "CUSTOM 3",
                                                        "description": ["custom_3", "/*Logger.addTraceTarget(new LoggerTraceTargetWithReport(\n\t\t\t\t\t\tnew SliderReportComposerBuilder().\n\t\t\t\t\t\t\t\twithOpeningReportAfterDestroy(true).\n\t\t\t\t\t\t\t\tbuild()\n\t\t\t\t)\n\t\t);*/"],
                                                        "type": "custom_3"
                                                    }, {
                                                        "date": 1468500385944,
                                                        "caption": "CUSTOM 4",
                                                        "description": ["custom_4", "/*Logger.addTraceTarget(new LoggerTraceTargetWithReport(\n\t\t\t\t\t\tnew SliderReportComposerBuilder().\n\t\t\t\t\t\t\t\twithOpeningReportAfterDestroy(true).\n\t\t\t\t\t\t\t\tbuild()\n\t\t\t\t)\n\t\t);*/"],
                                                        "type": "custom_4"
                                                    }, {
                                                        "date": 1468500385944,
                                                        "caption": "CUSTOM 5",
                                                        "description": ["custom_5", "/*Logger.addTraceTarget(new LoggerTraceTargetWithReport(\n\t\t\t\t\t\tnew SliderReportComposerBuilder().\n\t\t\t\t\t\t\t\twithOpeningReportAfterDestroy(true).\n\t\t\t\t\t\t\t\tbuild()\n\t\t\t\t)\n\t\t);*/"],
                                                        "type": "custom_5"
                                                    }],
                                                    "caption": "some text"
                                                },
                                                "caption": "Start Logger"
                                            }
                                        }
                                    }
                                },
                                "caption": "composer"
                            },
                            "data": [],
                            "caption": "reports"
                        },
                        "caption": "traceTargets"
                    },
                    "caption": "logger"
                },
                "caption": "autotesting"
            }
        },
        "caption": "com"
    }
};